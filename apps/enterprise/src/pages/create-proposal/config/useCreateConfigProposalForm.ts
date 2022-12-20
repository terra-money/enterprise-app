import { useForm, FormState } from '@terra-money/apps/hooks';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import { isFormStateValid, validateLength, validateUrl } from '@terra-money/apps/utils';
import Big from 'big.js';
import { useEnv } from 'hooks';
import { DaoInfoInput, DaoSocialDataInput } from 'pages/create-dao/DaoWizardFormProvider';
import { DaoGovConfigInput } from 'pages/create-dao/gov-config/DaoGovConfigInput';
import { validateUnlockingPeriod } from 'pages/create-dao/gov-config/helpers/validateGovConfig';
import {
  validateDiscordUsername,
  validateGithubUsername,
  validateTelegramUsername,
  validateTwitterUsername,
} from 'pages/create-dao/shared/helpers/validateSocials';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { useCurrentToken } from 'pages/shared/CurrentTokenProvider';
import { useCallback, useMemo } from 'react';
import { areChangesInConfig } from './helpers/areChangesInConfig';

export type ConfigProposalFormInput = DaoSocialDataInput & DaoInfoInput & DaoGovConfigInput;

export interface ConfigProposalFormState extends FormState<ConfigProposalFormInput> {
  timeConversionFactor: number;
  submitDisabled: boolean;
}

const validators: Partial<
  Record<keyof ConfigProposalFormInput, (value: any, inputState: ConfigProposalFormInput) => string | undefined>
> = {
  logo: (value) => {
    if (value) {
      return validateUrl(value);
    }
  },
  name: (value) => validateLength(value, 3, 140, 'name'),
  description: (value) => {
    if (value) {
      return validateLength(value, 3, 2000, 'description');
    }
  },

  discordUsername: validateDiscordUsername,
  githubUsername: validateGithubUsername,
  telegramUsername: validateTelegramUsername,
  twitterUsername: validateTwitterUsername,
  unlockingPeriod: (unlockingPeriod, { voteDuration }) => validateUnlockingPeriod(unlockingPeriod, voteDuration),
};

export const useCreateConfigProposalForm = () => {
  const { timeConversionFactor } = useEnv();

  const dao = useCurrentDao();
  const { token } = useCurrentToken();

  const validateInput = (input: Partial<ConfigProposalFormInput>, inputState: ConfigProposalFormInput) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const field = key as keyof ConfigProposalFormInput;
      const validator = validators[field];

      if (validator) {
        acc[`${field}Error`] = validator(value, inputState);
      }

      return acc;
    }, {} as Partial<ConfigProposalFormState>);
  };

  const getSubmitDisabled = useCallback(
    (inputState: ConfigProposalFormState) => !isFormStateValid(inputState) || !areChangesInConfig(inputState, dao),
    [dao]
  );

  const initialState: ConfigProposalFormState = useMemo(() => {
    const { name, logo, description, socials, governanceConfig } = dao;

    const unlockingPeriodInSeconds =
      'time' in governanceConfig.unlockingPeriod ? governanceConfig.unlockingPeriod.time : 0;

    const unlockingPeriod = Math.max(1, unlockingPeriodInSeconds / timeConversionFactor);

    const voteDuration = Math.max(1, governanceConfig.voteDuration / timeConversionFactor);

    const initialInput: ConfigProposalFormInput = {
      discordUsername: socials.discord_username || undefined,
      githubUsername: socials.github_username || undefined,
      telegramUsername: socials.telegram_username || undefined,
      twitterUsername: socials.twitter_username || undefined,

      logo: logo || '',
      name: name || '',
      description: description || '',

      quorum: governanceConfig.quorum,
      threshold: governanceConfig.threshold,
      unlockingPeriod,
      voteDuration,
    };

    if (governanceConfig.minimumDeposit && token) {
      initialInput.minimumDeposit = demicrofy(
        Big(governanceConfig.minimumDeposit) as u<Big>,
        token.decimals
      ).toNumber();
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

  return useForm<ConfigProposalFormInput, ConfigProposalFormState>(async (input, getState, dispatch) => {
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
