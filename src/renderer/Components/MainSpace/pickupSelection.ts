type PickupCandidate = {
  view?: number;
};

export const getPickupWeight = (view: number | undefined): number => {
  // 1 / sqrt(0) is infinite, so an unviewed game receives the maximum
  // finite weight by treating zero as one.
  const normalizedView =
    typeof view === 'number' && Number.isFinite(view) ? Math.max(view, 1) : 1;

  return 1 / Math.sqrt(normalizedView);
};

export const selectPickupGame = <T extends PickupCandidate>(
  candidates: T[],
  random: () => number = Math.random,
): T | undefined => {
  if (candidates.length === 0) {
    return undefined;
  }

  const weightedCandidates = candidates.map((candidate) => ({
    candidate,
    weight: getPickupWeight(candidate.view),
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
