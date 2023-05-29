import { Address } from 'chain/components/Address';
import { Text } from 'lib/ui/Text';

interface Props {
  owner: string;
}

export const MintNftSummary = ({ owner }: Props) => {
  return (
    <Text size={14} color="supporting">
      Mint an NFT for <Address value={owner} />
    </Text>
  );
};
