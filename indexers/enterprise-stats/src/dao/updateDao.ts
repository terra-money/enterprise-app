import { documentClient } from "db"
import { Dao } from "./Dao"
import { getTableName } from "db/tableName"
import { getUpdateParams } from "db/getUpdateParams"

export const getDaoItemParams = (address: string) => ({
  TableName: getTableName('daos'),
  Key: {
    sk: 'dao',
    pk: address,
  },
})

export const updateDao = (address: string, params: Partial<Dao>) => {
  return documentClient
    .update({
      ...getDaoItemParams(address),
      ...getUpdateParams(params),
    })
    .promise()
}