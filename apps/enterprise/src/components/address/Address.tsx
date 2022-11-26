import { Container } from '@terra-money/apps/components';
import { truncateAddress } from '@terra-money/apps/utils';
import { Text, TextProps } from 'components/primitives';
import { useClipboardCopy } from 'hooks';
import { ReactComponent as ClipboardIcon } from 'components/assets/Clipboard.svg';
import classNames from 'classnames';
import styles from './Address.module.sass';

interface AddressProps {
  className?: string;
  address?: string;
  truncation?: 'none' | [number, number];
  textProps?: Omit<TextProps, 'children'>;
}

export const Address = (props: AddressProps) => {
  const { className, address, textProps = {}, truncation = [12, 12] } = props;

  const clipboardCopy = useClipboardCopy();

  return (
    <Container className={classNames(className, styles.root)} component="div" direction="row">
      <Text
        variant="text"
        {...textProps}
        onClick={() => address && clipboardCopy({ value: address, message: 'Address copied to clipboard!' })}
      >
        {truncation === 'none' ? address : truncateAddress(address, truncation)}
      </Text>
      <ClipboardIcon className={styles.icon} />
    </Container>
  );
};
