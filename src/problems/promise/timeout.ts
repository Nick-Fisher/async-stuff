// Write a function that takes a Promise object and a certain number of milliseconds
// and returns a new Promise.
// If the provided Promise does not resolve before this time elapses,
// the resulting Promise should be rejected with an error new Error('Timeout').

function fetch(msg: string): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(msg), 300));
}

export const timeout = (promise: Promise<string>, ms: number) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearInterval(timer));
  });
};

timeout(fetch('url'), 500).then(console.log, console.log);
