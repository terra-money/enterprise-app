import { useEnv } from 'hooks';
import { DaoInfoInput, DaoSocialDataInput } from 'pages/create-dao/DaoWizardFormProvider';
import {
  validateDiscordUsername,
  validateGithubUsername,
  validateTelegramUsername,
  validateTwitterUsername,
} from 'pages/create-dao/shared/helpers/validateSocials';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useCallback, useMemo } from 'react';
import { hasChangedFields, toUpdateMetadataMsg } from './toUpdateMetadataMsg';
import { toDao } from 'dao/utils/toDao';
import { validateUrl } from 'lib/ui/utils/validateUrl';
import { FormState, isFormStateValid, useForm } from 'lib/shared/hooks/useForm';
import { validateLength } from 'lib/shared/utils/validateLength';

export type MetadataProposalFormInput = DaoSocialDataInput & DaoInfoInput;

export interface MetadataProposalFormState extends FormState<MetadataProposalFormInput> {
  timeConversionFactor: number;
  submitDisabled: boolean;
}

const validators: Partial<
  Record<keyof MetadataProposalFormInput, (value: any, inputState: MetadataProposalFormInput) => string | undefined>
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
};

export const useMetadataForm = () => {
  const { timeConversionFactor } = useEnv();

  const dao = useCurrentDao();

  const validateInput = (input: Partial<MetadataProposalFormInput>, inputState: MetadataProposalFormInput) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const field = key as keyof MetadataProposalFormInput;
      const validator = validators[field];

      if (validator) {
        acc[`${field}Error`] = validator(value, inputState);
      }

      return acc;
    }, {} as Partial<MetadataProposalFormState>);
  };

  const getSubmitDisabled = useCallback(
    (inputState: MetadataProposalFormInput) =>
      !isFormStateValid(inputState) || !hasChangedFields(toUpdateMetadataMsg(toDao(dao), inputState)),
    [dao]
  );

  const initialState: MetadataProposalFormState = useMemo(() => {
    const { name, logo, description, socials } = toDao(dao);

    const initialInput: MetadataProposalFormInput = {
      discordUsername: socials.discord_username || undefined,
      githubUsername: socials.github_username || 'github.com/',
      telegramUsername: socials.telegram_username || 't.me/',
      twitterUsername: socials.twitter_username || undefined,

      logo: logo || '',
      name: name || '',
      description: description || '',
    };

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
  }, [dao, getSubmitDisabled, timeConversionFactor]);

  return useForm<MetadataProposalFormInput, MetadataProposalFormState>(async (input, getState, dispatch) => {
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
