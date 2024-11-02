interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}

export const promiseAllSettled = <T>(
  promises: Array<T>
): Promise<Array<PromiseFulfilledResult<T> | PromiseRejectedResult>> => {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) resolve([]);

    const resultArray: Array<
      PromiseFulfilledResult<T> | PromiseRejectedResult
    > = [];

    let resolvedAmount: number = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          resultArray[index] = { status: 'fulfilled', value: data };
          resolvedAmount++;
        })
        .catch((data) => {
          resultArray[index] = { status: 'rejected', reason: data };
          resolvedAmount++;
        })
        .finally(
          () => promises.length === resolvedAmount && resolve(resultArray)
        );
    });
  });
};

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo')
);
const promises = [promise1, promise2];

promiseAllSettled(promises).then((results) =>
  results.forEach((result) => console.log(result))
);

// Expected output:
// { status: 'fulfilled', value: 3 }
// { status: 'rejected', reason: 'foo' }
