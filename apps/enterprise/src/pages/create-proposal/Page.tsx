import { AnimatedPage, ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { useRef, useState } from 'react';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { Header } from './Header';
import { useNavigate, useParams } from 'react-router';
import { useDAOQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import styles from './Page.module.sass';
import { Button, Text } from 'components/primitives';
import { OptionButton } from 'components/option-button';
import { FormFooter } from 'components/form-footer';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { Navigation } from 'components/Navigation';

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

export const Page = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  const ref = useRef<HTMLDivElement>(null);

  const [proposalType, setProposalType] = useState<ProposalType>('text');

  const navigate = useNavigate();

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            <ScrollableContainer
              stickyRef={ref}
              header={(visible) => (
                <StickyHeader visible={visible}>
                  <Header compact={true} title="Create a proposal" />
                </StickyHeader>
              )}
            >
              <AnimatedPage className={styles.root}>
                <Header ref={ref} title="Create a proposal" />
                <div className={styles.options}>
                  <Text variant="text" className={styles.label}>
                    Choose type
                  </Text>
                  <div className={styles.list}>
                    {proposalTypes.map((type, index) => {
                      if (type === 'members' && dao.type !== 'multisig') {
                        return null;
                      }
                      return (
                        <OptionButton
                          key={index}
                          title={proposalTitle[type]}
                          active={type === proposalType}
                          onClick={() => setProposalType(type)}
                        />
                      );
                    })}
                  </div>
                </div>
                <FormFooter
                  className={styles.footer}
                  primary={
                    <Button
                      onClick={() => navigate(`/dao/${dao.address}/proposals/create/${proposalType}`)}
                      variant="primary"
                    >
                      Next
                    </Button>
                  }
                  secondary={<Button onClick={() => navigate(`/dao/${dao.address}`)}>Cancel</Button>}
                />
              </AnimatedPage>
            </ScrollableContainer>
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </Navigation>
  );
};
