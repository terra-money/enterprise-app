import { sleep } from "./sleep"

interface RetryParams<T> {
  func: () => Promise<T>
  maxRetries?: number
  retryInterval: number
}

export async function retry<T>({ func, maxRetries, retryInterval }: RetryParams<T>) {
  while (true) {
    try {
      const result = await func()
      return result
    } catch (err) {
      if (maxRetries !== undefined) {
        maxRetries -= 1

        if (maxRetries === 0) {
          throw err
        }
      }
      sleep(retryInterval)
    }
  }
}