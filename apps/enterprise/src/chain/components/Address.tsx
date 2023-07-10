import { truncateAddress } from 'chain/utils/truncateAddress';
import { CopyText } from 'lib/ui/CopyText';

type AddressLength = 's' | 'm' | 'l' | 'full';

interface AddressProps {
  length?: AddressLength;
  value: string;
}

const shortenAddressByLength: Record<AddressLength, [number, number]> = {
  s: [7, 4],
  m: [12, 12],
  l: [20, 20],
  full: [0, 0],
};

export const Address = ({ length = 'm', value }: AddressProps) => {
  return <CopyText content={value}>{truncateAddress(value, shortenAddressByLength[length])}</CopyText>;
};
