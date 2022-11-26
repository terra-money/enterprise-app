import { makeTableName } from '@apps-shared/indexers/utils';

export class TableNames {
  static analytics() {
    return makeTableName('analytics');
  }
  static daos() {
    return makeTableName('daos');
  }
}
