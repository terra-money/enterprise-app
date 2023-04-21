import { ReactComponent as TwitterIcon } from 'components/assets/TwitterSolidLogo.svg';
import { ReactComponent as DiscordIcon } from 'components/assets/DiscordSolidLogo.svg';
import { ReactComponent as TelegramIcon } from 'components/assets/TelegramLogo.svg';
import { ReactComponent as GithubIcon } from 'components/assets/GithubLogo.svg';
import { ReactNode } from 'react';
import { SocialInput } from 'components/social-input';
import { DaoSocialDataInput } from '../DaoWizardFormProvider';
import { FormState } from '@terra-money/apps/hooks';

const socialDataKeys: Array<keyof DaoSocialDataInput> = [
  'githubUsername',
  'twitterUsername',
  'discordUsername',
  'telegramUsername',
];

export const socialName: Record<keyof DaoSocialDataInput, string> = {
  githubUsername: 'GitHub',
  twitterUsername: 'Twitter',
  discordUsername: 'Discord',
  telegramUsername: 'Telegram',
}

const socialIcon: Record<keyof DaoSocialDataInput, ReactNode> = {
  githubUsername: <GithubIcon />,
  twitterUsername: <TwitterIcon />,
  discordUsername: <DiscordIcon />,
  telegramUsername: <TelegramIcon />,
};

const socialPlaceholder: Record<keyof DaoSocialDataInput, string> = {
  githubUsername: 'Enter GitHub username',
  twitterUsername: 'Enter Twitter username',
  discordUsername: 'Enter Discord username',
  telegramUsername: 'Enter Telegram username',
};

interface SocialFieldsProps extends FormState<DaoSocialDataInput> {
  onChange: (value: Partial<DaoSocialDataInput>) => void;
}

export function SocialFields({ onChange, ...socials }: SocialFieldsProps) {
  return (
    <>
      {socialDataKeys.map((key) => {
        const value = socials[key];
        return (
          <SocialInput
            icon={socialIcon[key]}
            key={key}
            value={value}
            placeholder={socialPlaceholder[key]}
            onValueChange={(value) => onChange({ [key]: value })}
            error={value && value?.length > 0 ? socials[`${key}Error`] : undefined}
          />
        );
      })}
    </>
  );
}
