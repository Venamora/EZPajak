import { maskPhone, capitalizeWords } from '../utils/capitalize';

describe('maskPhone', () => {
  it('masks the middle digits of a valid phone number', () => {
    expect(maskPhone('081234567890')).toBe('081******890');
    expect(maskPhone('0812345678')).toBe('081****678');
  });
  it('returns original string if not a valid phone number', () => {
    expect(maskPhone('phone123')).toBe('phone123');
  });
});

describe('capitalizeWords', () => {
  it('capitalizes the first letter of each word', () => {
    expect(capitalizeWords('jalan mawar no. 1')).toBe('Jalan Mawar No. 1');
  });
  it('handles empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });
});
