import { AnimatedPage } from '@terra-money/apps/components';
import { useRef, useState } from 'react';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { Header } from './Header';
import { useNavigate, useParams } from 'react-router';
import { useDAOQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { Button } from 'components/primitives';
import { FormFooter } from 'components/form-footer';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { Navigation } from 'components/Navigation';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { MobileCreateProposalHeader } from './MobileCreateProposalHeader';
import { assertDefined } from '@terra-money/apps/utils';
import { PrimarySelect } from 'lib/ui/inputs/PrimarySelect';
import styled from '@emotion/styled';

const proposalTypes = ['text', 'config', 'upgrade', 'assets', 'nfts', 'execute', 'members'] as const;
type ProposalType = typeof proposalTypes[number];

export const proposalTitle: Record<ProposalType, string> = {
  text: 'Text proposal',
  config: 'Update configuration proposal',
  upgrade: 'Upgrade proposal',
  assets: 'Update whitelisted assets',
  nfts: 'Update whitelisted NFTs',
  execute: 'Proposal to execute message',
  members: 'Update multisig members',
};

const title = 'Create a proposal';

// TODO: turn into a reusable component
const NormalScreenContainer = styled(VStack)`
  padding: 48px 48px 64px 48px;
  height: 100%;
  gap: 32px;
`;

const NormalScreenContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Page = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  const ref = useRef<HTMLDivElement>(null);

  const [proposalType, setProposalType] = useState<ProposalType>('text');

  const navigate = useNavigate();

  const renderOptions = () => {
    const { type } = assertDefined(dao);
    const options = type === 'multisig' ? proposalTypes : proposalTypes.filter((type) => type !== 'members');
    return (
      <PrimarySelect
        label="Choose type"
        options={options}
        getName={(type) => proposalTitle[type]}
        selectedOption={proposalType}
        onSelect={setProposalType}
        groupName="proposal-type"
      />
    );
  };

  const renderFooter = () => {
    const { address } = assertDefined(dao);
    return (
      <FormFooter
        primary={
          <Button onClick={() => navigate(`/dao/${address}/proposals/create/${proposalType}`)} variant="primary">
            Next
          </Button>
        }
        secondary={<Button onClick={() => navigate(`/dao/${address}`)}>Cancel</Button>}
      />
    );
  };

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            <ResponsiveView
              small={() => (
                <VStack gap={24}>
                  <MobileCreateProposalHeader title={title} />
                  {renderOptions()}
                  {renderFooter()}
                </VStack>
              )}
              normal={() => (
                <AnimatedPage>
                  <NormalScreenContainer>
                    <Header ref={ref} title={title} />
                    <NormalScreenContent>{renderOptions()}</NormalScreenContent>
                    {renderFooter()}
                  </NormalScreenContainer>
                </AnimatedPage>
              )}
            />
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </Navigation>
  );
};
