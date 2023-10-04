import { ExternalLink } from 'components/link';
import { discordUrl, mediumUrl, telegramUrl, twitterUrl } from 'navigation';
import { SliceHeader } from './SliceHeader';
import { ReactComponent as TwitterIcon } from 'components/assets/TwitterSolidLogo.svg';
import { ReactComponent as DiscordIcon } from 'components/assets/DiscordSolidLogo.svg';
import { ReactComponent as TelegramIcon } from 'components/assets/TelegramLogo.svg';
import { ReactComponent as MediumIcon } from 'components/assets/MediumLogo.svg';
import { useDisplay } from 'hooks';
import classNames from 'classnames';
import styles from './LandingFooter.module.sass';
import { Button } from 'lib/ui/buttons/Button';
import { Text } from 'lib/ui/Text';
import { HStack } from 'lib/ui/Stack';

export const LandingFooter = () => {
  const { isDesktop, isMobile } = useDisplay();

  return (
    <div className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <div className={styles.header}>
        <SliceHeader
          title="More coming soon"
          description="New features are being added all the time. Follow Enterprise to stay up to date."
        />
        <div className={styles.actions}>
          <ExternalLink to={twitterUrl}>
            <Button kind="secondary" as="div">
              Twitter / X
            </Button>
          </ExternalLink>
          <ExternalLink to={mediumUrl}>
            <Button kind="secondary" as="div">
              Medium
            </Button>
          </ExternalLink>
        </div>
      </div>
      <div className={styles.links}>
        <HStack wrap="wrap" gap={40}>
          <ExternalLink to={telegramUrl}>
            <Text color="supporting">Contact Us</Text>
          </ExternalLink>
          <ExternalLink to="docs/terms_of_use.pdf">
            <Text color="supporting">Terms</Text>
          </ExternalLink>
          <ExternalLink to="docs/privacy_policy.pdf">
            <Text color="supporting">Privacy Policy</Text>
          </ExternalLink>
        </HStack>
        {isDesktop && (
          <div className={styles.socials}>
            <ExternalLink to={twitterUrl}>
              <TwitterIcon />
            </ExternalLink>
            <ExternalLink to={mediumUrl}>
              <MediumIcon />
            </ExternalLink>
            <ExternalLink to={telegramUrl}>
              <TelegramIcon />
            </ExternalLink>
            <ExternalLink to={discordUrl}>
              <DiscordIcon />
            </ExternalLink>
          </div>
        )}
      </div>
    </div>
  );
};
