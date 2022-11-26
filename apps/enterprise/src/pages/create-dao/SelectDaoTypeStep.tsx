import { WizardBody } from './WizardBody';
import { AnimatedPage, Container, ScrollableContainer } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import { OptionButton } from 'components/option-button';
import { useDaoWizardForm } from './DaoWizardFormProvider';
import styles from './SelectDaoTypeStep.module.sass';

export const SelectDaoTypeStep = () => {
  const {
    formState: { type },
    formInput,
  } = useDaoWizardForm();

  const helpContent = (
    <Container className={styles.child2} direction="column">
      <section className={styles.content}>
        {type === 'multisig' && (
          <>
            <Text variant="heading4">What is a multisig wallet?</Text>
            <Text variant="text">
              A "multisig" is a shared wallet, typically with two or more members authorizing transactions.
            </Text>
          </>
        )}
        {type === 'nft' && (
          <>
            <Text variant="heading4">What is a NFT Community DAO?</Text>
            <Text variant="text">
              NFT Community DAOs leverage NFTs as membership, giving NFT holders voting power to make decisions.
            </Text>
          </>
        )}
        {type === 'token' && (
          <>
            <Text variant="heading4">What is a Community Token DAO?</Text>
            <Text variant="text">
              Community Token DAOs leverage community tokens as membership, giving token holders voting power to make
              decisions
            </Text>
          </>
        )}
      </section>
    </Container>
  );

  return (
    <AnimatedPage className={styles.root} gutters="none">
      <WizardBody helpContent={helpContent}>
        <Container className={styles.child1} direction="column">
          <ScrollableContainer className={styles.scrollableContainer}>
            <Text className={styles.heading} variant="heading2">
              What type of DAO would you like to create?
            </Text>
            <section className={styles.options}>
              <OptionButton
                title="Multisig Wallet"
                active={type === 'multisig'}
                onClick={() => formInput({ type: 'multisig' })}
              />
              <OptionButton
                title="NFT Community DAO"
                active={type === 'nft'}
                onClick={() => formInput({ type: 'nft' })}
              />
              <OptionButton
                title="Community Token DAO"
                active={type === 'token'}
                onClick={() => formInput({ type: 'token' })}
              />
            </section>
          </ScrollableContainer>
        </Container>
      </WizardBody>
    </AnimatedPage>
  );
};
