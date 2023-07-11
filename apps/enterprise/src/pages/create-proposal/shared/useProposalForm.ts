import { FormState, isFormStateValid, useForm } from 'lib/shared/hooks/useForm';
import { validateLength } from 'lib/shared/utils/validateLength';
import { useMemo } from 'react';

export type ProposalFormInput = {
  title: string;
  description: string;
};

export interface ProposalFormState extends FormState<ProposalFormInput> {
  submitDisabled: boolean;
}

const validators: Partial<
  Record<keyof ProposalFormInput, (value: any, inputState: ProposalFormInput) => string | undefined>
> = {
  title: (value) => validateLength(value, 3, 140, 'title'),
  description: (value) => validateLength(value, 3, 2000, 'description'),
};

export const useProposalForm = (initial: Partial<ProposalFormState> = {}) => {
  const validateInput = (input: Partial<ProposalFormInput>, inputState: ProposalFormInput) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const field = key as keyof ProposalFormInput;
      const validator = validators[field];

      if (validator) {
        acc[`${field}Error`] = validator(value, inputState);
      }

      return acc;
    }, {} as Partial<ProposalFormState>);
  };

  const initialState: ProposalFormState = useMemo(() => {
    const initialInput: ProposalFormInput = {
      title: '',
      description: '',
      ...initial,
    };

    const state = {
      ...initialInput,
      ...validateInput(initialInput, initialInput),
    };

    return {
      ...state,
      submitDisabled: !isFormStateValid(state),
    };
  }, [initial]);

  return useForm<ProposalFormInput, ProposalFormState>(async (input, getState, dispatch) => {
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
