const INDEX = 0;
const UNLOCKED = 0;
const LOCKED = 1;

class Mutex {
  arrayView: Int32Array;

  constructor(sharedArrayBuffer: SharedArrayBuffer) {
    this.arrayView = new Int32Array(sharedArrayBuffer);
  }

  lock() {
    while (true) {
      const oldValue = Atomics.compareExchange(
        this.arrayView,
        INDEX,
        UNLOCKED,
        LOCKED
      );

      if (oldValue === UNLOCKED) {
        return;
      }

      Atomics.wait(this.arrayView, INDEX, LOCKED);
    }
  }

  unlock() {
    const oldValue = Atomics.exchange(this.arrayView, INDEX, UNLOCKED);

    if (oldValue === UNLOCKED) {
      throw new Error('Mutex is already unlocked');
    }

    Atomics.notify(this.arrayView, INDEX, 1);
  }

  executeLocked(callback: () => void) {
    const tryGetLock = async () => {
      while (true) {
        const oldValue = Atomics.compareExchange(
          this.arrayView,
          INDEX,
          UNLOCKED,
          LOCKED
        );

        if (oldValue === UNLOCKED) {
          callback();
          this.unlock();

          return;
        }

        const result = Atomics.waitAsync(this.arrayView, INDEX, LOCKED);

        await result.value;
      }
    };

    tryGetLock();
  }

  isLocked() {
    return this.arrayView[INDEX] === LOCKED;
  }
}
