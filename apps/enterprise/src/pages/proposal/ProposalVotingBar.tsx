import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import classNames from 'classnames';
import { Text } from 'components/primitives';
import { enforceRange } from 'lib/shared/utils/enforceRange';
import { HStack } from 'lib/ui/Stack';
import { useTokenStakingAmountQuery } from 'queries';
import { useMemo } from 'react';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './ProposalVotingBar.module.sass';
import { getRatio } from 'lib/shared/utils/getRatio';
import { toPercents } from 'lib/shared/utils/toPercents';

export const ProposalVotingBar = () => {
  const { yesVotes, noVotes, abstainVotes, vetoVotes, totalVotes, status, dao, type } = useCurrentProposal();

  const { data: totalStaked = Big(0) as u<Big> } = useTokenStakingAmountQuery(dao.address);

  const totalAvailableVotes = useMemo(() => {
    if (type === 'council') return totalVotes;

    if (dao.type === 'multisig') return totalVotes;

    return status === 'in_progress' ? totalStaked : totalVotes;
  }, [dao.type, status, totalStaked, totalVotes, type]);

  const total = yesVotes.add(noVotes).add(abstainVotes).add(vetoVotes);

  const quorum = type === 'council' ? Number(dao.council?.quorum) : Number(dao.governanceConfig.quorum);

  const yesRatio = enforceRange(getRatio(yesVotes, total).toNumber(), 0, 1);

  const noRatio = enforceRange(getRatio(noVotes, total).toNumber(), 0, 1);

  const abstainRatio = enforceRange(getRatio(abstainVotes, total).toNumber(), 0, 1);

  const totalBarWidth = toPercents(enforceRange(getRatio(total, totalAvailableVotes).toNumber(), 0, 1));

  const yesBarWidth = toPercents(yesRatio);

  const noBarWidth = toPercents(noRatio);

  const abstainBarWidth = toPercents(abstainRatio);

  return (
    <div className={styles.root}>
      <div className={styles.bar}>
        <div style={{ width: totalBarWidth }} className={styles.total}>
          <div style={{ width: yesBarWidth }} className={styles.yes}></div>
          {noRatio > 0 && <div style={{ width: noBarWidth }} className={styles.no}></div>}
          {abstainRatio > 0 && <div style={{ width: abstainBarWidth }} className={styles.abstain}></div>}
        </div>
        <div style={{ left: toPercents(quorum) }} className={styles.quorum}>
          <div className={styles.center}>
            <Text className={classNames(styles.value, styles.label)} variant="text">
              Quorum {toPercents(quorum)}
            </Text>
          </div>
        </div>
        <HStack gap={16} className={styles.votesContainer}>
          {yesRatio > 0 && (
            <HStack gap={16}>
              <HStack gap={8} alignItems="center">
                <div className={styles.yesBean}></div>
                <Text className={classNames(styles.value, styles.label)} variant="text">
                  Yes {toPercents(yesRatio, 'round')}
                </Text>
              </HStack>
            </HStack>
          )}
          {noRatio > 0 && (
            <HStack gap={16}>
              <HStack gap={8} alignItems="center">
                <div className={styles.noBean}></div>
                <Text className={classNames(styles.value, styles.label)} variant="text">
                  No {toPercents(noRatio, 'round')}
                </Text>
              </HStack>
            </HStack>
          )}
          {abstainRatio > 0 && (
            <HStack gap={16}>
              <HStack gap={8} alignItems="center">
                <div className={styles.abstainBean}></div>
                <Text className={classNames(styles.value, styles.label)} variant="text">
                  Abstain {toPercents(abstainRatio, 'round')}
                </Text>
              </HStack>
            </HStack>
          )}
        </HStack>
      </div>
    </div>
  );
};
