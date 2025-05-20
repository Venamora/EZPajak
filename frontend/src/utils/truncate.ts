// Utility for truncating text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (typeof text !== 'string' || maxLength <= 0) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + '…';
}
