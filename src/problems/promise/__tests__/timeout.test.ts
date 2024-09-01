import { timeout } from '../timeout';

describe('timeout function', () => {
  test('should resolve if promise resolves within the time limit', async () => {
    const mockPromise = new Promise<any>((resolve) =>
      setTimeout(() => resolve('Success'), 100)
    );
    await expect(timeout(mockPromise, 200)).resolves.toBe('Success');
  });

  test('should reject with "Timeout" error if promise takes too long to resolve', async () => {
    const mockPromise = new Promise<any>((resolve) =>
      setTimeout(() => resolve('Success'), 300)
    );
    await expect(timeout(mockPromise, 200)).rejects.toThrow('Timeout');
  });

  test('should reject with the same error if the promise itself rejects', async () => {
    const mockPromise = new Promise<any>((_, reject) =>
      setTimeout(() => reject(new Error('Failure')), 100)
    );
    await expect(timeout(mockPromise, 200)).rejects.toThrow('Failure');
  });

  test('should not resolve if the promise resolves after the timeout', async () => {
    const mockPromise = new Promise<any>((resolve) =>
      setTimeout(() => resolve('Late Success'), 300)
    );
    await expect(timeout(mockPromise, 100)).rejects.toThrow('Timeout');
  });
});
