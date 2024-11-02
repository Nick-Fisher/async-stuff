export const promiseAll = async <T>(promiseArr: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    const resultArr: T[] = [];
    promiseArr.length === 0 && resolve(resultArr);

    let fulfildedPromises = 0;

    promiseArr.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          resultArr[index] = result;
          fulfildedPromises++;

          fulfildedPromises === promiseArr.length && resolve(resultArr);
        })
        .catch(reject);
    });
  });
};

const promise1 = Promise.reject(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

// Expected output: Array [3, 42, "foo"]
