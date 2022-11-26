import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import luna from 'components/assets/Luna.svg';
import styles from './TokenIcon.module.sass';
import classNames from 'classnames';

const KNOWN_TOKENS: Record<string, string> = {
  luna,
};

type Variant = 'normal' | 'inset';

interface TokenIconProps extends Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'> {
  symbol?: string;
  path?: string;
  variant?: Variant;
}

export const TokenIcon = (props: TokenIconProps) => {
  const { className, symbol, path, variant = 'normal', onClick, ...rest } = props;

  let src = symbol && KNOWN_TOKENS[symbol.toLowerCase()] ? KNOWN_TOKENS[symbol.toLowerCase()] : path;

  src = src && src.length > 0 ? src : 'https://assets.terra.money/icon/svg/CW.svg';

  return variant === 'normal' ? (
    <img className={className} alt="" onClick={onClick} {...rest} src={src} />
  ) : (
    <div className={classNames(className, styles.root)} onClick={onClick}>
      <img alt="" {...rest} src={src} />
    </div>
  );
};
