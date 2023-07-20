import { Stack, VStack } from 'lib/ui/Stack';
import { DAOLogo } from 'components/dao-logo';

import { ProposalTags } from './ProposalTags';
import { getExpirationMessage } from 'utils';
import { useInterval } from 'react-use';
import { useState } from 'react';
import { useTokenStakingAmountQuery } from 'queries';
import Big, { BigSource } from 'big.js';
import { getProposalEstimatedExpiry } from 'dao/shared/proposal';
import styled from 'styled-components';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { InternalLink } from 'components/link';
import { getColor } from 'lib/ui/theme/getters';
import { useCurrentProposal } from 'pages/proposal/CurrentProposalProvider';
import { Panel } from 'lib/ui/Panel/Panel';
import { SeparatedByLine } from 'lib/ui/SeparatedByLine';
import { defaultTransitionCSS } from 'lib/ui/animations/transitions';
import { croppedTextCSS } from 'lib/ui/utils/croppedTextCSS';
import { getHorizontalPaddingCSS } from 'lib/ui/utils/getHorizontalPaddingCSS';

interface ClockProps {
  expiry: Date;
}

const Wrapper = styled.div`
  position: relative;
`;

const Clock = (props: ClockProps) => {
  const { expiry } = props;

  const [message, setMessage] = useState(getExpirationMessage(expiry));

  useInterval(() => {
    setMessage(getExpirationMessage(expiry));
  }, 60000);

  return <Text color="supporting">{message}</Text>;
};

interface ProgressBarProps {
  yes: BigSource;
  no: BigSource;
  total: BigSource;
}

const ProgressBarPosition = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  height: 4px;
  background: ${getColor('mist')};
`;

const Bar = styled.div`
  height: 100%;
  position: absolute;
  background: ${getColor('contrast')};
`;

const SecondaryBar = styled(Bar)`
  background: ${getColor('mistExtra')};
`;

const ProgressBar = (props: ProgressBarProps) => {
  const { yes, no, total } = props;

  if (Big(total).gt(0)) {
    const bar1 = Big(yes).div(total).mul(100).toFixed(4);
    const bar2 = Big(no).div(total).mul(100).toFixed(4);

    return (
      <ProgressBarContainer>
        <Bar style={{ width: `${bar1}%` }} />
        <SecondaryBar style={{ width: `${bar2}%`, left: `${bar1}%` }} />
      </ProgressBarContainer>
    );
  }

  return <ProgressBarContainer />;
};

const DaoLinkWrapper = styled(HStack)`
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  :hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`;

const DaoLinkOverlay = styled.div`
  position: absolute;
  margin-top: 20px;
  ${getHorizontalPaddingCSS(20)};
  bottom: 20px;
  ${croppedTextCSS};
  width: 100%;
`;

const Content = styled(Panel)`
  position: relative;
  height: 100%;

  ${defaultTransitionCSS};

  :hover {
    background: ${getColor('mist')};
  }
`;

const Description = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface ProposalCardProps {
  showDao?: boolean;
}

export const ProposalCard = ({ showDao }: ProposalCardProps) => {
  const proposal = useCurrentProposal();

  const { data: totalStaked = Big(0) } = useTokenStakingAmountQuery(proposal?.dao.address ?? '', undefined, {
    enabled: proposal !== undefined && proposal.status === 'in_progress',
  });

  const { dao, title, description, id } = proposal;

  const expiry = getProposalEstimatedExpiry(proposal);

  const totalVotes =
    dao.type === 'multisig'
      ? proposal.totalVotes
      : proposal.type === 'council'
      ? dao.council?.members.length!
      : proposal.status === 'in_progress'
      ? totalStaked
      : proposal.totalVotes;

  const daoLinkContent = (
    <DaoLinkWrapper alignItems="center" gap={8}>
      <DAOLogo size="s" logo={dao.logo} />
      <Text cropped>{dao.name}</Text>
    </DaoLinkWrapper>
  );

  return (
    <Wrapper>
      <InternalLink to={`/dao/${dao.address}/proposals/${proposal.id}`}>
        <Content kind="secondary">
          <SeparatedByLine fullHeight gap={20}>
            <VStack style={{ flex: 1 }} gap={20}>
              <HStack gap={8} wrap="wrap" fullWidth justifyContent="space-between">
                <ProposalTags proposal={proposal} />
                {expiry && <Clock expiry={expiry} />}
              </HStack>
              <HStack alignItems="center" gap={8}>
                <Text weight="semibold" color="shy">
                  #{id}
                </Text>
                <Text cropped weight="semibold">
                  {title}
                </Text>
              </HStack>

              <Description color="supporting">{description}</Description>
            </VStack>
            {showDao && (
              <Stack direction="row">
                <div style={{ opacity: 0 }}>{daoLinkContent}</div>
              </Stack>
            )}
          </SeparatedByLine>
          <ProgressBarPosition>
            <ProgressBar total={totalVotes} yes={proposal.yesVotes} no={proposal.noVotes} />
          </ProgressBarPosition>
        </Content>
      </InternalLink>
      {showDao && (
        <DaoLinkOverlay>
          <InternalLink to={`/dao/${dao.address}`}>{daoLinkContent}</InternalLink>
        </DaoLinkOverlay>
      )}
    </Wrapper>
  );
};
