import { Path } from 'navigation';
import { NavLink } from 'react-router-dom';
import styles from './DesktopNavigation.module.sass';
import { HStack } from 'lib/ui/Stack';

export const DesktopNavigation = () => {
  return (
    <HStack gap={16} alignItems="center">
      <span
        className={styles.link}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          const element = document.querySelector('#featuresExplorer');

          element?.scrollIntoView({
            behavior: 'smooth',
          });
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
    </HStack>
  );
};
