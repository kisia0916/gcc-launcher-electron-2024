type PickupCandidate = {
  view?: number;
};

export const PICKUP_HALF_LIFE = 100;

const normalizeView = (view: number | undefined): number =>
  typeof view === 'number' && Number.isFinite(view) ? Math.max(view, 0) : 0;

export const getPickupWeight = (
  view: number | undefined,
  minimumView: number,
  halfLife: number = PICKUP_HALF_LIFE,
): number => {
  if (!Number.isFinite(halfLife) || halfLife <= 0) {
    throw new RangeError('halfLife must be a positive finite number');
  }

  const viewDifference = Math.max(normalizeView(view) - minimumView, 0);

  return 2 ** (-viewDifference / halfLife);
};

export const selectPickupGame = <T extends PickupCandidate>(
  candidates: T[],
  random: () => number = Math.random,
): T | undefined => {
  if (candidates.length === 0) {
    return undefined;
  }

  const minimumView = candidates.reduce(
    (minimum, candidate) => Math.min(minimum, normalizeView(candidate.view)),
    Infinity,
  );
  const weightedCandidates = candidates.map((candidate) => ({
    candidate,
    weight: getPickupWeight(candidate.view, minimumView),
  }));
  const totalWeight = weightedCandidates.reduce(
    (total, candidate) => total + candidate.weight,
    0,
  );
  const lottery = random() * totalWeight;
  let cumulativeWeight = 0;

  const selected = weightedCandidates.find((candidate) => {
    cumulativeWeight += candidate.weight;

    return lottery < cumulativeWeight;
  });

  if (selected) {
    return selected.candidate;
  }

  // Floating-point rounding can theoretically leave the lottery just beyond
  // the final cumulative value.
  return weightedCandidates[weightedCandidates.length - 1].candidate;
};
