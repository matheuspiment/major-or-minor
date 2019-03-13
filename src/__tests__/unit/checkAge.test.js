import checkAge from '~/checkAge';

describe('checkAge', () => {
  it('should be of age', () => {
    expect(checkAge(18)).toBe(true);
  });
});
