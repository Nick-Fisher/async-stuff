import { sleep } from '../sleep';

jest.useFakeTimers();

test('sleep resolves even with zero milliseconds', async () => {
  const ms = 0;
  const promise = sleep(ms);

  jest.advanceTimersByTime(ms);

  await expect(promise).resolves.toBeUndefined();
});

test('sleep resolves after the specified time', async () => {
  const ms = 1000;
  const promise = sleep(ms);

  jest.advanceTimersByTime(ms);

  await expect(promise).resolves.toBeUndefined();
});
