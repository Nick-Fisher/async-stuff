export default function promiseRace<T extends readonly unknown[] | []>(
  iterable: T
): Promise<Awaited<T[number]>> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      return;
    }

    iterable.forEach(async (item) => {
      try {
        const result = await item;
        resolve(result as Awaited<T[number]>);
      } catch (err) {
        reject(err);
      }
    });
  });
}
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// Expected output: "two"
