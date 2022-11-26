import classNames from 'classnames';
import { SafeImage } from 'components/safe-image/SafeImage';
import { forwardRef } from 'react';
import { ReactComponent as LogoIcon } from 'components/assets/LogoSmall.svg';
import styles from './DAOLogo.module.sass';

type Variant = 'small' | 'large';

interface DAOLogoProps {
  className?: string;
  variant?: Variant;
  logo: string | undefined;
  onClick?: () => void;
}

export const DAOLogo = forwardRef<any, DAOLogoProps>((props, ref) => {
  const { className, variant = 'small', logo, onClick, ...rest } = props;

  return (
    <div
      className={classNames(className, styles.root, {
        [styles.link]: Boolean(onClick),
      })}
      ref={ref}
      onClick={onClick}
      data-variant={variant}
      {...rest}
    >
      <SafeImage
        fallback={<LogoIcon className={styles.placeholder} />}
        src={logo}
        render={(params) => <img ref={ref} {...params} alt="" />}
      />
    </div>
  );
});
