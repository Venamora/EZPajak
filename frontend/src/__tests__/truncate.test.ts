import { truncateText } from '../utils/truncate';

describe('truncateText', () => {
  it('returns the original text if shorter than maxLength', () => {
    expect(truncateText('short', 10)).toBe('short');
  });
  it('truncates and adds ellipsis if text is longer than maxLength', () => {
    expect(truncateText('This is a long sentence.', 10)).toBe('This is a…');
  });
  it('returns empty string for non-string input or non-positive maxLength', () => {
    // @ts-expect-error
    expect(truncateText(12345, 5)).toBe('');
    expect(truncateText('test', -1)).toBe('');
  });
});
