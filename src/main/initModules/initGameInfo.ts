import fs from 'node:fs';
import path from 'node:path';
import { app } from 'electron';

const DEFAULT_GENRE_ORDER = ['action', 'command', 'shooting', 'table', 'other'];
const PROJECT_TYPES = new Set(['exe', 'scratch', 'movie']);
const DIFFICULTIES = new Set(['easy', 'normal', 'hard']);

export interface GameInfo {
  genre: string;
  title: string;
  place: string;
  thumbnail: string;
  readme: string;
  project_type: 'exe' | 'scratch' | 'movie';
  diff: 'easy' | 'normal' | 'hard';
}

export interface GameCatalog {
  schemaVersion: 2;
  genres: string[];
  [genre: string]: GameInfo[] | string[] | number;
}

export interface CatalogGenerationResult {
  catalog: GameCatalog;
  warnings: string[];
}

interface LauncherManifest {
  title?: unknown;
  entry?: unknown;
  project_type?: unknown;
  difficulty?: unknown;
  description?: unknown;
}

export const getLauncherRoot = () =>
  path.resolve(
    process.env.GCC_LAUNCHER_ROOT
      || (app.isPackaged ? path.dirname(process.execPath) : process.cwd()),
  );

const toPortablePath = (launcherRoot: string, absolutePath: string) =>
  path.relative(launcherRoot, absolutePath).split(path.sep).join('/');

const parseLauncherManifest = (manifestPath: string) => {
  const lines = fs
    .readFileSync(manifestPath, 'utf8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/);

  return {
    title: lines[0]?.trim(),
    entry: lines[1]?.trim(),
    project_type: lines[2]?.trim().toLowerCase(),
    difficulty: lines[3]?.trim().toLowerCase(),
    description: lines.slice(4).join('\n').trim(),
  };
};

const loadGame = (
  launcherRoot: string,
  genre: string,
  gameName: string,
  gameDirectory: string,
): GameInfo => {
  const manifestPath = path.join(gameDirectory, 'launcher_meta.txt');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('launcher_meta.txt is required');
  }
  const manifest: LauncherManifest = parseLauncherManifest(manifestPath);

  const title = typeof manifest.title === 'string' && manifest.title.trim()
    ? manifest.title.trim()
    : gameName;
  const entry = typeof manifest.entry === 'string' ? manifest.entry.trim() : '';
  const projectType = typeof manifest.project_type === 'string'
    ? manifest.project_type.trim().toLowerCase()
    : '';
  const difficulty = typeof manifest.difficulty === 'string'
    ? manifest.difficulty.trim().toLowerCase()
    : '';

  if (!entry) throw new Error('entry file is missing');
  if (!PROJECT_TYPES.has(projectType)) {
    throw new Error(`unsupported project_type: ${projectType || '(empty)'}`);
  }
  if (!DIFFICULTIES.has(difficulty)) {
    throw new Error(`unsupported difficulty: ${difficulty || '(empty)'}`);
  }

  const entryPath = path.resolve(gameDirectory, entry);
  if (!entryPath.startsWith(`${path.resolve(gameDirectory)}${path.sep}`)) {
    throw new Error('entry must stay inside the game directory');
  }
  if (!fs.existsSync(entryPath) || !fs.statSync(entryPath).isFile()) {
    throw new Error(`entry file was not found: ${entry}`);
  }

  const files = fs.readdirSync(gameDirectory, { withFileTypes: true });
  const thumbnailName = files.find(
    (file) => file.isFile() && path.parse(file.name).name.toLowerCase() === 'thumbnail',
  )?.name;
  if (!thumbnailName) throw new Error('thumbnail file was not found');

  const thumbnailPath = path.resolve(gameDirectory, thumbnailName);
  if (!thumbnailPath.startsWith(`${path.resolve(gameDirectory)}${path.sep}`)) {
    throw new Error('thumbnail must stay inside the game directory');
  }
  if (!fs.existsSync(thumbnailPath) || !fs.statSync(thumbnailPath).isFile()) {
    throw new Error(`thumbnail file was not found: ${thumbnailName}`);
  }

  return {
    genre,
    title,
    place: toPortablePath(launcherRoot, entryPath),
    thumbnail: toPortablePath(launcherRoot, thumbnailPath),
    readme: typeof manifest.description === 'string' ? manifest.description.trim() : '',
    project_type: projectType as GameInfo['project_type'],
    diff: difficulty as GameInfo['diff'],
  };
};

export const generateGameJson = (): CatalogGenerationResult => {
  const launcherRoot = getLauncherRoot();
  const gamesRoot = path.join(launcherRoot, 'launcher-game', 'games');
  if (!fs.existsSync(gamesRoot) || !fs.statSync(gamesRoot).isDirectory()) {
    throw new Error(`games directory was not found: ${gamesRoot}`);
  }

  const discoveredGenres = fs.readdirSync(gamesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name);
  const genres = [
    ...DEFAULT_GENRE_ORDER.filter((genre) => discoveredGenres.includes(genre)),
    ...discoveredGenres.filter((genre) => !DEFAULT_GENRE_ORDER.includes(genre)).sort(),
  ];
  const catalog: GameCatalog = { schemaVersion: 2, genres };
  const warnings: string[] = [];
  const titles = new Set<string>();

  for (const genre of genres) {
    const genreDirectory = path.join(gamesRoot, genre);
    const games: GameInfo[] = [];
    const gameDirectories = fs.readdirSync(genreDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
      .sort((a, b) => a.name.localeCompare(b.name, 'ja'));

    for (const entry of gameDirectories) {
      try {
        const game = loadGame(launcherRoot, genre, entry.name, path.join(genreDirectory, entry.name));
        if (titles.has(game.title)) {
          throw new Error(`duplicate title: ${game.title}`);
        }
        titles.add(game.title);
        games.push(game);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        warnings.push(`${genre}/${entry.name}: ${message}`);
      }
    }
    catalog[genre] = games;
  }

  const gameCount = genres.reduce(
    (count, genre) => count + (catalog[genre] as GameInfo[]).length,
    0,
  );
  if (gameCount === 0) throw new Error('no valid games were found');

  const catalogPath = path.join(launcherRoot, 'game_info.json');
  const temporaryPath = `${catalogPath}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
  fs.renameSync(temporaryPath, catalogPath);

  return { catalog, warnings };
};

export const resolveCatalogPaths = (catalog: GameCatalog): GameCatalog => {
  const launcherRoot = getLauncherRoot();
  const resolved: GameCatalog = { schemaVersion: 2, genres: [...catalog.genres] };
  for (const genre of catalog.genres) {
    resolved[genre] = (catalog[genre] as GameInfo[]).map((game) => ({
      ...game,
      place: path.isAbsolute(game.place) ? game.place : path.resolve(launcherRoot, game.place),
      thumbnail: path.isAbsolute(game.thumbnail)
        ? game.thumbnail
        : path.resolve(launcherRoot, game.thumbnail),
    }));
  }
  return resolved;
};
