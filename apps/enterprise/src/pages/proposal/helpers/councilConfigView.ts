import { toPercents } from 'lib/shared/utils/toPercents';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';

export interface CouncilConfigView extends Record<string, string | undefined> {
  quorum: string;
  threshold: string;
}

export const councilConfigViewFieldNameRecord: Record<keyof CouncilConfigView, string> = {
  quorum: 'Quorum',
  threshold: 'Threshold',
};

export const getUpdatedFields = (msg: enterprise.DaoCouncilSpec): Partial<CouncilConfigView> => {
  const view: Partial<CouncilConfigView> = {};

  view.quorum = toPercents(Number(msg.quorum), 'round');
  view.threshold = toPercents(Number(msg.threshold), 'round');

  return view;
};

export const fromDao = (dao: DAO): CouncilConfigView => {
  const { governanceConfig } = dao;

  const result: CouncilConfigView = {
    quorum: toPercents(governanceConfig.quorum, 'round'),
    threshold: toPercents(governanceConfig.threshold, 'round'),
  };

  return result;
};
