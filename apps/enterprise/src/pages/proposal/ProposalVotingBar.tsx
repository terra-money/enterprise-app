import { u } from '@terra-money/apps/types';
import { getRatio, toPercents } from '@terra-money/apps/utils';
import Big from 'big.js';
import classNames from 'classnames';
import { Text } from 'components/primitives';
import { enforceRange } from 'lib/shared/utils/enforceRange';
import { useTokenStakingAmountQuery } from 'queries';
import { useMemo } from 'react';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './ProposalVotingBar.module.sass';

export const ProposalVotingBar = () => {
  const { yesVotes, noVotes, abstainVotes, vetoVotes, totalVotes, status, dao, votingType } = useCurrentProposal();

  const { data: totalStaked = Big(0) as u<Big> } = useTokenStakingAmountQuery(dao.address);

  const totalAvailableVotes = useMemo(() => {
    if (votingType === 'council') return totalVotes;

    if (dao.type === 'multisig') return totalVotes;

    return status === 'in_progress' ? totalStaked : totalVotes;
  }, [dao.type, status, totalStaked, totalVotes, votingType]);

  const total = yesVotes.add(noVotes).add(abstainVotes).add(vetoVotes);

  const quorum = Number(dao.governanceConfig.quorum);

  const yesRatio = enforceRange(getRatio(yesVotes, total).toNumber(), 0, 1);

  const totalBarWidth = toPercents(enforceRange(getRatio(total, totalAvailableVotes).toNumber(), 0, 1));

  const yesBarWidth = toPercents(yesRatio);

  return (
    <div className={styles.root}>
      <div className={styles.bar}>
        <div style={{ width: totalBarWidth }} className={styles.total}>
          <div style={{ width: yesBarWidth }} className={styles.yes}>
            {yesRatio > 0 && (
              <div className={styles.center}>
                <Text className={classNames(styles.value, styles.label)} variant="text">
                  Yes {toPercents(yesRatio, 'round')}
                </Text>
              </div>
            )}
          </div>
        </div>
        <div style={{ left: toPercents(quorum) }} className={styles.quorum}>
          <div className={styles.center}>
            <Text className={classNames(styles.value, styles.label)} variant="text">
              Quorum {toPercents(quorum)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
