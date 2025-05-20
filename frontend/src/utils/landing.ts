// Utility functions for frontend formatting and labeling

export function getTaxTypeLabel(value: string): string {
  const taxTypes: { [key: string]: string } = {
    pph21: 'Pajak Penghasilan (PPh) 21',
    pph22: 'Pajak Penghasilan (PPh) 22',
    pph23: 'Pajak Penghasilan (PPh) 23',
    ppn: 'Pajak Pertambahan Nilai (PPN)',
    pbb: 'Pajak Bumi dan Bangunan (PBB)',
    pkb: 'Pajak Kendaraan Bermotor (PKB)',
  };
  return taxTypes[value] || value;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format a time string (HH:MM) from a date string
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Mask an email address for privacy (e.g., s****n@email.com)
 */
export function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!user || !domain) return email;
  if (user.length <= 2) return email;
  return user[0] + '*'.repeat(user.length - 2) + user[user.length - 1] + '@' + domain;
}
