import { fromChainAmount } from 'chain/utils/fromChainAmount';
import Big from 'big.js';
import { useEnv } from 'hooks';
import { DaoGovConfigInput } from 'pages/create-dao/gov-config/DaoGovConfigInput';
import { validateUnlockingPeriod } from 'pages/create-dao/gov-config/helpers/validateGovConfig';

import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useCurrentToken } from 'pages/shared/CurrentTokenProvider';
import { useCallback, useMemo } from 'react';
import { hasChangedFields } from '../metadata/toUpdateMetadataMsg';
import { toUpdateGovConfigMsg } from './helpers/toUpdateGovConfigMsg';
import { toDao } from 'dao/utils/toDao';
import { FormState, isFormStateValid, useForm } from 'lib/shared/hooks/useForm';

export interface ConfigProposalFormState extends FormState<DaoGovConfigInput> {
  timeConversionFactor: number;
  submitDisabled: boolean;
}

const validators: Partial<
  Record<keyof DaoGovConfigInput, (value: any, inputState: DaoGovConfigInput) => string | undefined>
> = {
  unlockingPeriod: (unlockingPeriod, { voteDuration }) => validateUnlockingPeriod(unlockingPeriod, voteDuration),
};

export const useCreateConfigProposalForm = () => {
  const { timeConversionFactor } = useEnv();

  const dao = useCurrentDao();
  const { token } = useCurrentToken();

  const validateInput = (input: Partial<DaoGovConfigInput>, inputState: DaoGovConfigInput) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const field = key as keyof DaoGovConfigInput;
      const validator = validators[field];

      if (validator) {
        acc[`${field}Error`] = validator(value, inputState);
      }

      return acc;
    }, {} as Partial<ConfigProposalFormState>);
  };

  const getSubmitDisabled = useCallback(
    (inputState: ConfigProposalFormState) =>
      !isFormStateValid(inputState) || !hasChangedFields(toUpdateGovConfigMsg(toDao(dao), inputState)),
    [dao]
  );

  const initialState: ConfigProposalFormState = useMemo(() => {
    const { governanceConfig } = toDao(dao);

    const unlockingPeriodInSeconds =
      'time' in governanceConfig.unlockingPeriod ? governanceConfig.unlockingPeriod.time : 0;

    const unlockingPeriod = Math.max(1, unlockingPeriodInSeconds / timeConversionFactor);

    const voteDuration = Math.max(1, governanceConfig.voteDuration / timeConversionFactor);

    const initialInput: DaoGovConfigInput = {
      quorum: governanceConfig.quorum,
      threshold: governanceConfig.threshold,
      vetoThreshold: governanceConfig.vetoThreshold,
      unlockingPeriod,
      voteDuration,
    };

    if (governanceConfig.minimumDeposit && token) {
      initialInput.minimumDeposit = fromChainAmount(Big(governanceConfig.minimumDeposit).toNumber(), token.decimals);
    }

    const state = {
      timeConversionFactor,
      ...initialInput,
      ...validateInput(initialInput, initialInput),
      submitDisabled: false,
    };

    return {
      ...state,
      submitDisabled: getSubmitDisabled(state),
    };
  }, [dao, getSubmitDisabled, token, timeConversionFactor]);

  return useForm<DaoGovConfigInput, ConfigProposalFormState>(async (input, getState, dispatch) => {
    const newState = {
      ...getState(),
      ...input,
    };

    const validatedState = {
      ...newState,
      ...validateInput(input, newState),
    };

    dispatch({ ...validatedState, submitDisabled: getSubmitDisabled(validatedState) });
  }, initialState);
};
