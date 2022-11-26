import dotenv from "dotenv";
dotenv.config();

export const makeTableName = (tableName: string): string => {
  if (process.env.TABLE_PREFIX) {
    return `${process.env.TABLE_PREFIX}-${tableName}`;
  }
  return tableName;
};
