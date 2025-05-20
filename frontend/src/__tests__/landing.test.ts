import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { getTaxTypeLabel, formatCurrency, formatDate, formatTime, maskEmail } from '../utils/landing';

describe('getTaxTypeLabel', () => {
  it('returns correct label for known tax types', () => {
    expect(getTaxTypeLabel('pph21')).toBe('Pajak Penghasilan (PPh) 21');
  });

  it('returns value itself for unknown tax type', () => {
    expect(getTaxTypeLabel('unknown')).toBe('unknown');
  });
});

describe('formatCurrency', () => {
  it('formats number as IDR currency', () => {
    const result1 = formatCurrency(10000).replace(/\u00A0/g, ' ');
    const result2 = formatCurrency(5000000).replace(/\u00A0/g, ' ');
    expect(result1).toBe('Rp 10.000');
    expect(result2).toBe('Rp 5.000.000');
  });
});

describe('formatDate', () => {
  it('formats ISO date string to Indonesian date', () => {
    expect(formatDate('2024-05-20T10:00:00Z')).toMatch(/20.*Mei.*2024/);
  });
});

describe('formatTime', () => {
  it('formats ISO date string to Indonesian time', () => {
    expect(formatTime('2024-05-20T10:15:00Z')).toMatch(/17\.15|17:15/); // WIB is UTC+7
  });
  it('formats time with leading zero', () => {
    expect(formatTime('2024-05-20T03:05:00Z')).toMatch(/10\.05|10:05/); // WIB is UTC+7
  });
});

describe('maskEmail', () => {
  it('masks the user part of the email', () => {
    expect(maskEmail('steven@email.com')).toBe('s****n@email.com');
  });
  it('returns original string if not a valid email', () => {
    expect(maskEmail('notanemail')).toBe('notanemail');
    expect(maskEmail('user@')).toBe('user@');
  });
});
