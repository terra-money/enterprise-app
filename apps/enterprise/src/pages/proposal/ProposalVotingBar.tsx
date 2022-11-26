import { u } from '@terra-money/apps/types';
import { getRatio, toPercents } from '@terra-money/apps/utils';
import Big from 'big.js';
import classNames from 'classnames';
import { Text } from 'components/primitives';
import { useTokenStakingAmountQuery } from 'queries';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './ProposalVotingBar.module.sass';

export const ProposalVotingBar = () => {
  const { yesVotes, noVotes, abstainVotes, vetoVotes, totalVotes, status, dao } = useCurrentProposal();

  const { data: totalStaked = Big(0) as u<Big> } = useTokenStakingAmountQuery(dao.address);

  const totalAvailableVotes =
    dao.type === 'multisig' ? totalVotes : status === 'in_progress' ? totalStaked : totalVotes;

  const total = yesVotes.add(noVotes).add(abstainVotes).add(vetoVotes);

  const quorum = Number(dao.governanceConfig.quorum);

  const yesRatio = getRatio(yesVotes, totalAvailableVotes);

  const totalBarWidth = toPercents(getRatio(total, totalAvailableVotes).toNumber());

  const yesBarWidth = toPercents(getRatio(yesVotes, total).toNumber());

  return (
    <div className={styles.root}>
      <div className={styles.bar}>
        <div style={{ width: totalBarWidth }} className={styles.total}>
          <div style={{ width: yesBarWidth }} className={styles.yes}>
            {yesRatio.gt(0) && (
              <div className={styles.center}>
                <Text className={classNames(styles.value, styles.label)} variant="text">
                  Yes {toPercents(yesRatio.toNumber(), 'round')}
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
