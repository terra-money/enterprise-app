import { PropsWithChildren } from 'react';
import { Container } from '@terra-money/apps/components';
import { Logo } from './Logo';
import styles from './Layout.module.sass';

interface LayoutProps extends PropsWithChildren {}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container className={styles.root} direction="column">
      <Container className={styles.header} direction="column">
        <Logo />
      </Container>
      <Container className={styles.content} direction="column">
        {children}
      </Container>
    </Container>
  );
};
