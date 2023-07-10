import { None } from '../cancellation';

export function sleep(ms: number, token = None) {
  return new Promise<void>((resolve, reject) => {
    const handle = setTimeout(() => {
      unsubscribe();
      resolve();
    }, ms);

    const unsubscribe = token.subscribe((err) => {
      clearTimeout(handle);
      reject(err);
    });
  });
}
