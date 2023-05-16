export const getUpdateParams = (params: { [key: string]: any }) => ({
  UpdateExpression: `set ${Object.entries(params)
    .map(([key]) => `#${key} = :${key}, `)
    .reduce((acc, str) => acc + str)
    .slice(0, -2)}`,

  ExpressionAttributeNames: Object.keys(params).reduce(
    (acc, key) => ({
      ...acc,
      [`#${key}`]: key,
    }),
    {}
  ),
  
  ExpressionAttributeValues: Object.entries(params).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`:${key}`]: value,
    }),
    {}
  ),
})
