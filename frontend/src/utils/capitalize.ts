// Utility for masking phone numbers for privacy
export function maskPhone(phone: string): string {
  if (!/^\d{10,14}$/.test(phone)) return phone;
  return phone.slice(0, 3) + '*'.repeat(phone.length - 6) + phone.slice(-3);
}

// Utility for capitalizing the first letter of each word
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
