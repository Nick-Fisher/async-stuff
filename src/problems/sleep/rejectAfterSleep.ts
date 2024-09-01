export const rejectAfterSleep = (ms: number, msg: string) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(msg), ms);
  });
};

// rejectAfterSleep(3000, 'boom!').catch((err) => {
//   console.log(err);
// });
