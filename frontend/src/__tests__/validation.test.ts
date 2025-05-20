import { isValidNIK, isValidPhone, isValidPositiveTaxAmount } from '../utils/validation';

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
    it('returns false for phone number less than 10 digits', () => {
      expect(isValidPhone('081234567')).toBe(false);
    });
    it('returns false for phone number with non-numeric characters', () => {
      expect(isValidPhone('08123abc890')).toBe(false);
    });
  });

  describe('Form Validation', () => {
    it('should return true when all input fields are filled correctly', () => {
      const nama = 'Steven';
      const nik = '1234567890123456';
      const alamat = 'Jl. Mawar No. 1';
      const email = 'user@email.com';
      const telepon = '0812345678';
      const jenisPajak = 'pbb';
      const jumlahPajak = '10000';

      expect(nama).not.toBe('');
      expect(nik).not.toBe('');
      expect(alamat).not.toBe('');
      expect(email).not.toBe('');
      expect(telepon).not.toBe('');
      expect(jenisPajak).not.toBe('');
      expect(jumlahPajak).not.toBe('');
      expect(isValidNIK(nik)).toBe(true);
      expect(isValidPhone(telepon)).toBe(true);
      expect(isValidPositiveTaxAmount(jumlahPajak)).toBe(true);
    });

    describe('isValidPositiveTaxAmount', () => {
      it('returns true for positive amount', () => {
        expect(isValidPositiveTaxAmount('10000')).toBe(true);
        expect(isValidPositiveTaxAmount(5000)).toBe(true);
      });
      it('returns false for zero', () => {
        expect(isValidPositiveTaxAmount('0')).toBe(false);
      });
      it('returns false for negative amount', () => {
        expect(isValidPositiveTaxAmount('-100')).toBe(false);
      });
      it('returns false for non-numeric', () => {
        expect(isValidPositiveTaxAmount('abc')).toBe(false);
      });
    });
  });
});
