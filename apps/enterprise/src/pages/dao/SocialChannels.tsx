import { Container } from '@terra-money/apps/components';
import { Text } from '../../components/primitives';
import { ReactComponent as TwitterIcon } from 'components/assets/TwitterLogo.svg';
import { ReactComponent as DiscordIcon } from 'components/assets/DiscordLogo.svg';
import { GitHub as GitHubIcon, Telegram as TelegramIcon } from '@mui/icons-material';
import { SocialItem } from './SocialItem';
import { Action, DAO } from 'types';
import { createDiscordURL, createGithubProfileURL, createTelegramURL, createTwitterProfileURL } from 'utils';
import styles from './SocialChannels.module.sass';

interface SocialChannelsProps {
  dao: DAO;
}

export const SocialChannels = (props: SocialChannelsProps) => {
  const { dao } = props;

  const { github_username, discord_username, telegram_username, twitter_username } = dao.socials;

  if (Boolean(github_username || discord_username || telegram_username || twitter_username) === false) {
    return null;
  }

  const openURL = (url: string): Action<void> => {
    return () => {
      window.open(url);
    };
  };

  return (
    <Container direction={'column'} gap={16}>
      <Text variant={'heading4'}>Social channels</Text>
      <Container direction={'row'} className={styles.socials_container} gap={32}>
        {github_username && (
          <SocialItem
            icon={<GitHubIcon />}
            username={github_username}
            onClick={openURL(createGithubProfileURL(github_username))}
          />
        )}
        {twitter_username && (
          <SocialItem
            icon={<TwitterIcon />}
            username={twitter_username}
            onClick={openURL(createTwitterProfileURL(twitter_username))}
          />
        )}
        {discord_username && (
          <SocialItem
            icon={<DiscordIcon />}
            username={discord_username}
            onClick={openURL(createDiscordURL(discord_username))}
          />
        )}
        {telegram_username && (
          <SocialItem
            icon={<TelegramIcon />}
            username={telegram_username}
            onClick={openURL(createTelegramURL(telegram_username))}
          />
        )}
      </Container>
    </Container>
  );
};
