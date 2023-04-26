import { DynamoDB } from 'aws-sdk'

export const documentClient = new DynamoDB.DocumentClient({})
