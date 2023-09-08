import Big from 'big.js';
import classNames from 'classnames';
import { Text } from 'lib/ui/Text';
import { enforceRange } from 'lib/shared/utils/enforceRange';
import { HStack } from 'lib/ui/Stack';
import { useTokenStakingAmountQuery } from 'queries';
import { useMemo } from 'react';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './ProposalVotingBar.module.sass';
import { getRatio } from 'lib/shared/utils/getRatio';
import { toPercents } from 'lib/shared/utils/toPercents';
import styled, { useTheme } from 'styled-components';
import { getColor } from 'lib/ui/theme/getters';
import { Circle } from 'lib/ui/Circle';

const Quorum = styled.div`
  position: absolute;
  top: -16px;
  height: 12px;
  width: 1px;
  background: ${getColor('textShy')};
`;

const Center = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    white-space: nowrap;
    position: absolute;
    top: -20px;
  }
`;

export const ProposalVotingBar = () => {
  const { yesVotes, noVotes, abstainVotes, vetoVotes, totalVotes, status, dao, type } = useCurrentProposal();

  const { data: totalStaked = Big(0) as Big } = useTokenStakingAmountQuery(dao.address);

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

  const { colors } = useTheme();

  return (
    <div className={styles.root}>
      <div style={{ background: colors.mist.toCssValue() }} className={styles.bar}>
        <div style={{ width: totalBarWidth }} className={styles.total}>
          <div style={{ width: yesBarWidth, background: colors.success.toCssValue() }} className={styles.yes}></div>
          {noRatio > 0 && (
            <div style={{ width: noBarWidth, background: colors.alert.toCssValue() }} className={styles.no}></div>
          )}
          {abstainRatio > 0 && (
            <div
              style={{ width: abstainBarWidth, background: colors.textShy.toCssValue() }}
              className={styles.abstain}
            ></div>
          )}

        </div>
        <Quorum style={{ left: toPercents(quorum) }}>
          <Center>
            <Text size={14} color="supporting">
              Quorum {toPercents(quorum)}
            </Text>
          </Center>
        </Quorum>

        <HStack gap={16} className={styles.votesContainer}>
          {yesRatio > 0 && (
            <HStack gap={16}>
              <HStack gap={8} alignItems="center">
                <Circle size={8} background={colors.success} />
                <Text className={classNames(styles.value, styles.label)} size={14} color="supporting">
                  Yes {toPercents(yesRatio, 'round')}
                </Text>
              </HStack>
            </HStack>
          )}
          {noRatio > 0 && (
            <HStack gap={16}>
              <HStack gap={8} alignItems="center">
                <Circle size={8} background={colors.alert} />
                <Text className={classNames(styles.value, styles.label)} size={14} color="supporting">
                  No {toPercents(noRatio, 'round')}
                </Text>
              </HStack>
            </HStack>
          )}
          {abstainRatio > 0 && (
            <HStack gap={16}>
              <HStack gap={8} alignItems="center">
                <Circle size={8} background={colors.textShy} />

                <Text className={classNames(styles.value, styles.label)} size={14} color="supporting">
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
