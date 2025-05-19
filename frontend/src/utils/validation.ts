// Validation utility for NIK and phone number
export function isValidNIK(nik: string): boolean {
  return /^\d{16}$/.test(nik);
}

export function isValidPhone(phone: string): boolean {
  return /^\d{10,14}$/.test(phone);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPositiveTaxAmount(amount: string | number): boolean {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(value) && value > 0;
}
