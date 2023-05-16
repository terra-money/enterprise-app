export const mergeParams = (...params: any[]) =>
  params.reduce(
    (acc, param) =>
      Object.entries(param).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value)
          ? [...acc[key], ...value]
          : typeof value === "object"
          ? { ...acc[key], ...value }
          : value
        return acc
      }, acc),
    {}
  )
