export const projectionExpression = (attributes?: string[]) => {
  if (!attributes) {
    return {}
  }

  const ProjectionExpression = attributes
    .map((attr) => `${attr.includes(".") ? "" : "#"}${attr}, `)
    .reduce((acc, str) => acc + str)
    .slice(0, -2)

  const attributesToExpression = attributes.filter(
    (attr) => !attr.includes(".")
  )
  
  const ExpressionAttributeNames = attributesToExpression.reduce<{
    [key: string]: string
  }>((acc, attr) => {
    acc["#" + attr] = attr
    return acc
  }, {})

  return attributesToExpression.length
    ? { ProjectionExpression, ExpressionAttributeNames }
    : { ProjectionExpression }
}
