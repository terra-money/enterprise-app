import { Drawer } from '@mui/material';
import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { ReactComponent as MenuIcon } from 'components/assets/Menu.svg';
import { ExternalLink } from 'components/link';
import { IconButton, Text } from 'components/primitives';
import { useState } from 'react';
import { discordUrl, mediumUrl, Path, telegramUrl, twitterUrl } from 'navigation';
import { ReactComponent as TwitterIcon } from 'components/assets/TwitterSolidLogo.svg';
import { ReactComponent as DiscordIcon } from 'components/assets/DiscordSolidLogo.svg';
import { ReactComponent as TelegramIcon } from 'components/assets/TelegramLogo.svg';
import { ReactComponent as MediumIcon } from 'components/assets/MediumLogo.svg';
import styles from './MobileNavigation.module.sass';
import { NavLink } from 'react-router-dom';

interface MobileNavigationProps {
  className: string;
}

export const MobileNavigation = (props: MobileNavigationProps) => {
  const { className } = props;

  const [open, setOpen] = useState(false);

  return (
    <Container className={classNames(className)}>
      <IconButton className={styles.menuButton} variant="outline" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        classes={{
          paper: styles.drawer,
        }}
        onClose={() => setOpen(false)}
      >
        <Container className={styles.container} direction="column">
          <IconButton className={styles.menuButton} variant="outline" onClick={() => setOpen(false)}>
            <MenuIcon />
          </IconButton>
          <Container className={styles.content} direction="column">
            <Text variant="label">Menu</Text>
            <Container className={styles.menu} direction="column" gap={24}>
              <NavLink className={styles.link} to={Path.Dashboard}>
                <Text variant="heading3" component="span">
                  App
                </Text>
              </NavLink>
              <a className={styles.link} href="https://docs.enterprise.money">
                <Text variant="heading3" component="span">
                  Docs
                </Text>
              </a>
            </Container>
          </Container>
          <Container className={styles.footer} direction="column" gap={16}>
            <Text variant="label">Social media</Text>
            <Container className={styles.footer} direction="row" gap={16}>
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
            </Container>
          </Container>
        </Container>
      </Drawer>
    </Container>
  );
};
