import { ReactComponent as TwitterIcon } from 'components/assets/TwitterSolidLogo.svg';
import { ReactComponent as DiscordIcon } from 'components/assets/DiscordSolidLogo.svg';
import { ReactComponent as TelegramIcon } from 'components/assets/TelegramLogo.svg';
import { ReactComponent as GithubIcon } from 'components/assets/GithubLogo.svg';
import { ReactNode, useEffect, useState } from 'react';
import { SocialInput } from 'components/social-input';
import { DaoSocialDataInput } from '../DaoWizardFormProvider';
import { FormState } from '@terra-money/apps/hooks';

const socialDataKeys: Array<keyof DaoSocialDataInput> = [
  'githubUsername',
  'twitterUsername',
  'discordUsername',
  'telegramUsername',
];

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
  const [updatedSocials, setUpdatedSocials] = useState({
    ...socials,
    githubUsername: socials.githubUsername || 'github.com/',
    telegramUsername: socials.telegramUsername || 't.me/',
  });

  useEffect(() => {
    onChange(updatedSocials);
  }, [updatedSocials, onChange]);

  
  return (
    <>
      {socialDataKeys.map((key) => {
        const value = updatedSocials[key];
        return (
          <SocialInput
            icon={socialIcon[key]}
            key={key}
            value={value}
            placeholder={socialPlaceholder[key]}
            onValueChange={(value) => setUpdatedSocials({ ...updatedSocials, [key]: value })}
            error={value && value?.length > 0 ? updatedSocials[`${key}Error`] : undefined}
          />
        );
      })}
    </>
  );
}
