import {
  getPickupWeight,
  selectPickupGame,
} from '../renderer/Components/MainSpace/pickupSelection';

describe('pickup selection', () => {
  const candidates = [
    { title: 'A', view: 4 },
    { title: 'B', view: 16 },
    { title: 'C', view: 64 },
  ];

  it('uses 1 / sqrt(view) as the selection weight', () => {
    expect(getPickupWeight(4)).toBe(0.5);
    expect(getPickupWeight(16)).toBe(0.25);
    expect(getPickupWeight(64)).toBe(0.125);
  });

  it('treats zero views as the maximum finite weight', () => {
    expect(getPickupWeight(0)).toBe(1);
  });

  it('selects from cumulative weights without sorting candidates', () => {
    const totalWeight = 0.5 + 0.25 + 0.125;
    const selected = selectPickupGame(candidates, () => 0.6 / totalWeight);

    expect(selected?.title).toBe('B');
    expect(candidates.map((candidate) => candidate.title)).toEqual([
      'A',
      'B',
      'C',
    ]);
  });
});
