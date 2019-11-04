import { toEnglish } from '../src/margin';
it('', () => {
  expect(true).toBe(true);
});

describe('margins', () => {
  describe('toEnglish', () => {
    it('should treat one for all', () => {
      const margins = toEnglish(32);

      expect(margins.top).toBe(32);
      expect(margins.bottom).toBe(32);
      expect(margins.left).toBe(32);
      expect(margins.right).toBe(32);
    });

    it('should treat 2 as my and mx respectively', () => {
      const margins = toEnglish([6, 12]);

      expect(margins.top).toBe(6);
      expect(margins.bottom).toBe(6);
      expect(margins.left).toBe(12);
      expect(margins.right).toBe(12);
    });

    it('should treat 3 as mt, mx  and mb respectively', () => {
      const margins = toEnglish([6, 12, 8]);

      expect(margins.top).toBe(6);
      expect(margins.bottom).toBe(8);
      expect(margins.left).toBe(12);
      expect(margins.right).toBe(12);
    });

    it('should treat 4 as mt, mr, mb and ml respectively', () => {
      const margins = toEnglish([6, 12, 8, 10]);

      expect(margins.top).toBe(6);
      expect(margins.bottom).toBe(8);
      expect(margins.left).toBe(10);
      expect(margins.right).toBe(12);
    });
  });
});
