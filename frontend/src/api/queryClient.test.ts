import { isNormalisedApiError } from './queryClient';

describe('isNormalisedApiError', () => {
  it('returns true for a valid api error shape', () => {
    expect(isNormalisedApiError({ statusCode: 404, message: 'Not found' })).toBe(true);
  });

  it('returns false for a plain Error object', () => {
    expect(isNormalisedApiError(new Error('oops'))).toBe(false);
  });

  it('returns false for null', () => {
    expect(isNormalisedApiError(null)).toBe(false);
  });

  it('returns false when statusCode is missing', () => {
    expect(isNormalisedApiError({ message: 'oops' })).toBe(false);
  });

  it('returns false when message is missing', () => {
    expect(isNormalisedApiError({ statusCode: 500 })).toBe(false);
  });
});
