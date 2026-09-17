import selectPickupGame from '../renderer/Components/MainSpace/pickupSelection';

describe('pickup selection', () => {
  const candidates = [
    { title: 'A', view: 120 },
    { title: 'B', view: 90 },
    { title: 'C', view: 100 },
  ];

  it('selects the game with the lowest view count without sorting', () => {
    const selected = selectPickupGame(candidates);

    expect(selected?.title).toBe('B');
    expect(candidates.map((candidate) => candidate.title)).toEqual([
      'A',
      'B',
      'C',
    ]);
  });

  it('selects the first game when the lowest view count is tied', () => {
    const selected = selectPickupGame([
      { title: 'A', view: 50 },
      { title: 'B', view: 50 },
      { title: 'C', view: 80 },
    ]);

    expect(selected?.title).toBe('A');
  });

  it('returns undefined when there are no candidates', () => {
    expect(selectPickupGame([])).toBeUndefined();
  });
});
