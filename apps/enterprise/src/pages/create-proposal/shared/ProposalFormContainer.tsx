import { Container, Form, ScrollableContainer } from '@terra-money/apps/components';
import { useRef } from 'react';
import { Header } from '../Header';
import { AnimatedPage, StickyHeader } from '@terra-money/apps/components';
import { CreateProposalFooter } from '../CreateProposalFooter';
import styles from './ProposalFormContainer.module.sass';

interface ProposalFormContainerProps {
  title: string;
  children: React.ReactNode;
  loading: boolean;
  onSubmit: () => void;
  disabled: boolean;
}

export const ProposalFormContainer = ({ title, children, loading, onSubmit, disabled }: ProposalFormContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.root}>
      <ScrollableContainer
        stickyRef={ref}
        header={(visible) => (
          <StickyHeader visible={visible}>
            <Header compact={true} title={title} />
          </StickyHeader>
        )}
      >
        <AnimatedPage className={styles.content}>
          <Header ref={ref} title={title} />
          <Form className={styles.form}>
            <Container className={styles.container} gap={32} direction="column">
              {children}
            </Container>
          </Form>
          <CreateProposalFooter loading={loading} onSubmit={onSubmit} disabled={disabled} />
        </AnimatedPage>
      </ScrollableContainer>
    </div>
  );
};
