import { FormState } from 'lib/shared/hooks/useForm';
import { DaoSocialDataInput } from 'pages/create-dao/DaoWizardFormProvider';

// accepts anything
const validateSocial = (value: string | undefined) => {
  return undefined;
};

export const validateGithubUsername = (value: string | undefined) => {
  return validateSocial(value);

  // GitHub username validadion
  // if (value && /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(value) === false) {
  //   return `Invalid Github Username`;
  // }
};

export const validateTwitterUsername = (value: string | undefined) => {
  return validateSocial(value);

  // Twitter username validadion
  // if (value && /^@?(\w){1,15}$/.test(value) === false) {
  //   return `Invalid Twitter Username`;
  // }
};

export const validateDiscordUsername = (value: string | undefined) => {
  return validateSocial(value);

  // Discord username validadion
  // if (value && /^.{3,32}#[0-9]{4}$/.test(value) === false) {
  //   return `Invalid Discord Username`;
  // }
};

export const validateTelegramUsername = (value: string | undefined) => {
  return validateSocial(value);

  // Telegram username validadion
  // if (value && /^(https:\/\/t\.me\/|t\.me\/|@|)(\w+)$/.test(value) === false) {
  //   return `Invalid Telegram Username`;
  // }
};

export const validateSocials = ({
  githubUsername,
  discordUsername,
  twitterUsername,
  telegramUsername,
}: DaoSocialDataInput): FormState<DaoSocialDataInput> => {
  const formState: FormState<DaoSocialDataInput> = {
    githubUsername,
    discordUsername,
    twitterUsername,
    telegramUsername,
  };

  formState.githubUsernameError = validateGithubUsername(githubUsername);

  formState.discordUsernameError = validateDiscordUsername(discordUsername);

  formState.twitterUsernameError = validateTwitterUsername(twitterUsername);

  formState.telegramUsernameError = validateTelegramUsername(telegramUsername);

  return formState;
};
