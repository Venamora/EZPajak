import { isValidNIK, isValidPhone } from '../utils/validation';

describe('Validation Utils', () => {
  describe('isValidNIK', () => {
    it('returns true for valid 16 digit NIK', () => {
      expect(isValidNIK('1234567890123456')).toBe(true);
    });
    it('returns false for NIK with less than 16 digits', () => {
      expect(isValidNIK('123456789012345')).toBe(false);
    });
    it('returns false for NIK with more than 16 digits', () => {
      expect(isValidNIK('12345678901234567')).toBe(false);
    });
    it('returns false for NIK with non-numeric characters', () => {
      expect(isValidNIK('12345678901234ab')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('returns true for valid phone number (10 digits)', () => {
      expect(isValidPhone('0812345678')).toBe(true);
    });
    it('returns true for valid phone number (14 digits)', () => {
      expect(isValidPhone('08123456789012')).toBe(true);
    });
    it('returns false for phone number less than 10 digits', () => {
      expect(isValidPhone('081234567')).toBe(false);
    });
    it('returns false for phone number more than 14 digits', () => {
      expect(isValidPhone('081234567890123')).toBe(false);
    });
    it('returns false for phone number with non-numeric characters', () => {
      expect(isValidPhone('08123abc890')).toBe(false);
    });
  });
});
