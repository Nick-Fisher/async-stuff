import { rejectAfterSleep } from '../rejectAfterSleep';

jest.useFakeTimers();

describe('rejectAfterSleep', () => {
  it('should reject after sleep', () => {
    const msg = 'boom!';
    const promise = rejectAfterSleep(3000, msg);

    jest.advanceTimersByTime(2999);
    expect(promise).rejects.toBe(msg);

    jest.advanceTimersByTime(1);
  });
});
