import { enterprise } from 'types/contracts';

export const toUpgradeDaoMsg = (codeId: number): enterprise.UpgradeDaoMsg => ({
  migrate_msg: '{}',
  new_dao_code_id: codeId,
});
