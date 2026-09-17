type PickupCandidate = {
  view?: number;
};

const normalizeView = (view: number | undefined): number =>
  typeof view === 'number' && Number.isFinite(view) ? Math.max(view, 0) : 0;

const selectPickupGame = <T extends PickupCandidate>(
  candidates: T[],
): T | undefined => {
  if (candidates.length === 0) {
    return undefined;
  }

  return candidates.reduce((selected, candidate) =>
    normalizeView(candidate.view) < normalizeView(selected.view)
      ? candidate
      : selected,
  );
};

export default selectPickupGame;
