import {
  getPickupWeight,
  selectPickupGame,
} from '../renderer/Components/MainSpace/pickupSelection';

describe('pickup selection', () => {
  const candidates = [
    { title: 'A', view: 1000 },
    { title: 'B', view: 1100 },
    { title: 'C', view: 1200 },
  ];

  it('halves the weight for every 100 views above the minimum', () => {
    expect(getPickupWeight(1000, 1000)).toBe(1);
    expect(getPickupWeight(1100, 1000)).toBe(0.5);
    expect(getPickupWeight(1200, 1000)).toBe(0.25);
  });

  it('uses the same curve even when all view counts are large', () => {
    expect(getPickupWeight(10000, 10000)).toBe(1);
    expect(getPickupWeight(10100, 10000)).toBe(0.5);
  });

  it('selects from cumulative weights without sorting candidates', () => {
    const totalWeight = 1 + 0.5 + 0.25;
    const selected = selectPickupGame(candidates, () => 1.2 / totalWeight);

    expect(selected?.title).toBe('B');
    expect(candidates.map((candidate) => candidate.title)).toEqual([
      'A',
      'B',
      'C',
    ]);
  });
});
