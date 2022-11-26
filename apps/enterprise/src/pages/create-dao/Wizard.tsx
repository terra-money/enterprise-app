import { getLast } from '@terra-money/apps/utils';
import { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { enterprise } from 'types/contracts';
import { WizardButtons, WizardButtonsProps } from './WizardButtons';
import { WizardLayout } from './WizardLayout';

// TODO: remove WizardInput
export interface WizardInput<T> {
  steps: T[];
}

export interface WizardState<T> {
  steps: T[];
  predictedSteps: T[];
  type: enterprise.DaoType;
  isValid: boolean;
}

interface WizardProps<T> extends WizardState<T> {
  children: ReactNode;
  onSubmit: () => Promise<void>;
  onStepsChange: (steps: T[]) => void;
}

export function Wizard<T>(props: WizardProps<T>) {
  const { children, steps, predictedSteps, onStepsChange, onSubmit, isValid } = props;

  const percentageComplete = Math.trunc((steps.length / predictedSteps.length) * 100);

  const navigate = useNavigate();
  const buttonProps: WizardButtonsProps = useMemo(() => {
    return {
      backVisible: true,
      backDisabled: false,
      onBack: () => {
        if (steps.length === 1) {
          navigate('/dao/create');
        } else {
          onStepsChange(steps.slice(0, -1));
        }
      },

      nextVisible: steps.length < predictedSteps.length,
      nextDisabled: !isValid,
      onNext: () => {
        const stepIndex = predictedSteps.indexOf(getLast(steps));
        onStepsChange([...steps, predictedSteps[stepIndex + 1]]);
      },

      finishVisible: steps.length === predictedSteps.length,
      finishDisabled: false,
      onFinish: async () => {
        try {
          await onSubmit();
          navigate('/dashboard');
        } catch (error) {
          console.log(error);
        }
      },
    };
  }, [isValid, navigate, onStepsChange, onSubmit, predictedSteps, steps]);

  return (
    <WizardLayout percentageComplete={percentageComplete} footer={<WizardButtons {...buttonProps} />}>
      {children}
    </WizardLayout>
  );
}
