import { Container, UIElementProps } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import classNames from 'classnames';
import styles from './Panel.module.sass';

export interface PanelProps extends UIElementProps {
  title?: string;
}

export const Panel = (props: PanelProps) => {
  const { className, title, children } = props;

  return (
    <Container className={classNames(className, styles.root)} component="section" direction="column">
      {title && (
        <Text variant="label" className={styles.title}>
          {title}
        </Text>
      )}
      {children}
    </Container>
  );
};
