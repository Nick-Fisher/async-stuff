type IResolvedItem<T> = {
  status: string;
  value?: T;
  reason?: T;
};

export const promiseAllSettled = <T>(
  promises: Promise<T>[]
): Promise<IResolvedItem<T>[]> => {
  return new Promise((resolve, reject) => {
    const resultArray: IResolvedItem<T>[] = [];

    let resolvedAmount: number = 0;

    promises.forEach((promise, index) => {
      promise
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
