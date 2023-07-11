import { ReactComponent as TwitterIcon } from 'components/assets/TwitterSolidLogo.svg';
import { ReactComponent as DiscordIcon } from 'components/assets/DiscordSolidLogo.svg';
import { ReactComponent as TelegramIcon } from 'components/assets/TelegramLogo.svg';
import { ReactComponent as GithubIcon } from 'components/assets/GithubLogo.svg';
import { ReactNode } from 'react';
import { DaoSocialDataInput } from '../DaoWizardFormProvider';
import { TextInput } from 'lib/ui/inputs/TextInput';
import styled from 'styled-components';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { getCSSUnit } from 'lib/ui/utils/getCSSUnit';
import { inputHeight } from 'lib/ui/inputs/config';
import { FormState } from 'lib/shared/hooks/useForm';

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
};

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

const IconOverlay = styled.div`
  position: absolute;
  pointer-events: none;
  width: ${getCSSUnit(inputHeight)};
  left: 0;
  font-size: 28px;
  ${centerContentCSS};
`;

const Input = styled(TextInput)`
  padding-left: ${getCSSUnit(inputHeight)};
`;

export function SocialFields({ onChange, ...socials }: SocialFieldsProps) {
  return (
    <>
      {socialDataKeys.map((key) => {
        const value = socials[key];
        return (
          <Input
            label={socialName[key]}
            key={key}
            value={value}
            placeholder={socialPlaceholder[key]}
            onValueChange={(value) => onChange({ [key]: value })}
            error={value && value?.length > 0 ? socials[`${key}Error`] : undefined}
            inputOverlay={<IconOverlay>{socialIcon[key]}</IconOverlay>}
          />
        );
      })}
    </>
  );
}
