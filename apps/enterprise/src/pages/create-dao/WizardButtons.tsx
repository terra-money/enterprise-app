import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { Button } from 'components/primitives';
import styles from './WizardButtons.module.sass';

export interface WizardButtonsProps {
  className?: string;
  onNext?: () => void;
  nextVisible?: boolean;
  nextDisabled?: boolean;
  onBack?: () => void;
  backVisible?: boolean;
  backDisabled?: boolean;
  onFinish?: () => void;
  finishVisible?: boolean;
  finishDisabled?: boolean;
}

export const WizardButtons = (props: WizardButtonsProps) => {
  const {
    className,
    onNext,
    nextVisible = true,
    nextDisabled = false,
    onBack,
    backDisabled = false,
    backVisible = true,
    onFinish,
    finishVisible = false,
    finishDisabled = false,
  } = props;

  return (
    <Container className={classNames(className, styles.root)} direction="row">
      {backVisible && (
        <Button variant="secondary" onClick={onBack} disabled={backDisabled}>
          Back
        </Button>
      )}
      {nextVisible && (
        <Button variant="primary" onClick={onNext} disabled={nextDisabled}>
          Next
        </Button>
      )}
      {finishVisible && (
        <Button variant="primary" onClick={onFinish} disabled={finishDisabled}>
          Finish
        </Button>
      )}
    </Container>
  );
};
