import { FormState, isFormStateValid, useForm } from 'lib/shared/hooks/useForm';
import { useMemo } from 'react';

export type UpgradeProposalFormInput = {
  codeId: number | undefined;
};

export interface UpgradeProposalFormState extends FormState<UpgradeProposalFormInput> {
  submitDisabled: boolean;
}

const validators: Partial<
  Record<keyof UpgradeProposalFormInput, (value: any, inputState: UpgradeProposalFormInput) => string | undefined>
> = {
  codeId: (value) => (value === undefined ? 'Code ID is required' : undefined),
};

export const useCreateUpgradeProposalForm = () => {
  const validateInput = (input: Partial<UpgradeProposalFormInput>, inputState: UpgradeProposalFormInput) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const field = key as keyof UpgradeProposalFormInput;
      const validator = validators[field];

      if (validator) {
        acc[`${field}Error`] = validator(value, inputState);
      }

      return acc;
    }, {} as Partial<UpgradeProposalFormState>);
  };

  const initialState: UpgradeProposalFormState = useMemo(() => {
    const initialInput: UpgradeProposalFormInput = {
      codeId: undefined,
    };

    const state = {
      ...initialInput,
      ...validateInput(initialInput, initialInput),
    };

    return {
      ...state,
      submitDisabled: !isFormStateValid(state),
    };
  }, []);

  return useForm<UpgradeProposalFormInput, UpgradeProposalFormState>(async (input, getState, dispatch) => {
    const newState = {
      ...getState(),
      ...input,
    };

    const validatedState = {
      ...newState,
      ...validateInput(input, newState),
    };

    const submitDisabled = !isFormStateValid(validatedState);

    dispatch({ ...validatedState, submitDisabled });
  }, initialState);
};
