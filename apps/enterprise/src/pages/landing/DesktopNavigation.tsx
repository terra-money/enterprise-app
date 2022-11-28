import { Container, useScrollableContext } from '@terra-money/apps/components';
import classNames from 'classnames';
import { Path } from 'navigation';
import { NavLink } from 'react-router-dom';
import styles from './DesktopNavigation.module.sass';

interface DesktopNavigationProps {
  className: string;
}

export const DesktopNavigation = (props: DesktopNavigationProps) => {
  const { className } = props;

  const scrollable = useScrollableContext();

  return (
    <Container className={classNames(className, styles.root)}>
      <span
        className={styles.link}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (scrollable) {
            const element = document.querySelector('#featuresExplorer');

            const STICKY_HEADER_HEIGHT = 112;
            const PADDING_TOP = 40;

            const { y } = element?.getBoundingClientRect() ?? { y: 0 };

            scrollable.scrollTo({
              top: y - STICKY_HEADER_HEIGHT - PADDING_TOP,
              left: 0,
              behavior: 'smooth',
            });
          }
        }}
      >
        <span>Features</span>
      </span>
      <a className={styles.link} href="https://docs.enterprise.money">
        <span>Docs</span>
      </a>
      <NavLink className={styles.link} to={Path.Dashboard}>
        <span>App</span>
      </NavLink>
    </Container>
  );
};
