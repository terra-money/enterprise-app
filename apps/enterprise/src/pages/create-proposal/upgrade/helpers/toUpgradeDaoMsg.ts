import { enterprise } from 'types/contracts';

export const toUpgradeDaoMsg = (codeId: number, migrateMsg: string): enterprise.UpgradeDaoMsg => {
  return {
    migrate_msg: migrateMsg,
    new_dao_code_id: codeId,
  };
};
