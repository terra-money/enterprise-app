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
  const { yesVotes, noVotes, abstainVotes, vetoVotes, totalVotes, status, dao, type } = useCurrentProposal();
  
  
  const { data: totalStaked = Big(0) as u<Big> } = useTokenStakingAmountQuery(dao.address);

  const totalAvailableVotes = useMemo(() => {
    if (type === 'council') return totalVotes;

    if (dao.type === 'multisig') return totalVotes;

    return status === 'in_progress' ? totalStaked : totalVotes;
  }, [dao.type, status, totalStaked, totalVotes, type]);

  const total = yesVotes.add(noVotes).add(abstainVotes).add(vetoVotes);

  const quorum = Number(dao.governanceConfig.quorum);

  const yesRatio = enforceRange(getRatio(yesVotes, total).toNumber(), 0, 1);

  const noRatio = enforceRange(getRatio(noVotes, total).toNumber(), 0 ,1);

  const abstainRatio = enforceRange(getRatio(abstainVotes, total).toNumber(), 0, 1);
  
  const totalBarWidth = toPercents(enforceRange(getRatio(total, totalAvailableVotes).toNumber(), 0, 1));

  const yesBarWidth = toPercents(yesRatio);

  const noBarWidth = toPercents(noRatio);

  const abstainBarWidth = toPercents(abstainRatio);

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
         {noRatio > 0 && <div style={{ width: noBarWidth }} className={styles.no}>
            {noRatio > 0 && (
              <div className={styles.center}>
                <Text className={classNames(styles.value, styles.label)} variant="text">
                  No {toPercents(noRatio, 'round')}
                </Text>
              </div>
            )}
          </div>} 
         {abstainRatio > 0 && <div style={{ width: abstainBarWidth }} className={styles.abstain}>
            {abstainRatio > 0 && (
              <div className={styles.center}>
                <Text className={classNames(styles.value, styles.label)} variant="text">
                  Abstain {toPercents(abstainRatio, 'round')}
                </Text>
              </div>
            )}
          </div>} 
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
