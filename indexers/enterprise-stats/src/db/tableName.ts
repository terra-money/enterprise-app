import dotenv from "dotenv";
dotenv.config();

type TableNameAlias = "daos"

export const getTableName = (tableName: TableNameAlias): string => {
  if (process.env.TABLE_PREFIX) {
    return `${process.env.TABLE_PREFIX}-${tableName}`;
  }
  return tableName;
};
