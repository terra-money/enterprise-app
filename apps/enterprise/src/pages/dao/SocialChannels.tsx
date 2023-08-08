import { ReactComponent as TwitterIcon } from 'components/assets/TwitterLogo.svg';
import { ReactComponent as DiscordIcon } from 'components/assets/DiscordLogo.svg';
import { SocialItem } from './SocialItem';
import { createDiscordURL, createGithubProfileURL, createTelegramURL, createTwitterProfileURL } from 'utils';
import { HStack, VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import styled from 'styled-components';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { GitHubIcon } from 'lib/ui/icons/GitHubIcon';
import { TelegramIcon } from 'lib/ui/icons/TelegramIcon';
import { Text } from 'lib/ui/Text';

const Container = styled(HStack)`
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SocialChannels = () => {
  const dao = useCurrentDao();
  const { github_username, discord_username, telegram_username, twitter_username } = dao.metadata.socials;

  if (Boolean(github_username || discord_username || telegram_username || twitter_username) === false) {
    return null;
  }

  return (
    <VStack gap={16}>
      <Text weight="bold">Social channels</Text>
      <Panel>
        <Container>
          {github_username && (
            <SocialItem icon={<GitHubIcon />} username={github_username} getUrl={createGithubProfileURL} />
          )}
          {twitter_username && (
            <SocialItem icon={<TwitterIcon />} username={twitter_username} getUrl={createTwitterProfileURL} />
          )}
          {discord_username && (
            <SocialItem icon={<DiscordIcon />} username={discord_username} getUrl={createDiscordURL} />
          )}
          {telegram_username && (
            <SocialItem icon={<TelegramIcon />} username={telegram_username} getUrl={createTelegramURL} />
          )}
        </Container>
      </Panel>
    </VStack>
  );
};
