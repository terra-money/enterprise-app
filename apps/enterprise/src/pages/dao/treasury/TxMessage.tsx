import { AccAddress, Coin, Coins } from '@terra-money/feather.js';
import { isDenom } from '@terra.kitchen/utils';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { ReactNode } from 'react';
import { TxAsset } from './TxAsset';
import { useNetworkName } from 'chain/hooks/useNetworkName';
import { truncateAddress } from 'chain/utils/truncateAddress';
import { capitalizeFirstLetter } from 'lib/shared/utils/capitalizeFirstLetter';

interface TxMessageProps {
  text: string;
  targetAddress: string;
}

const validateTokens = (tokens: any) => {
  const validate = ({ denom }: Coin) => isDenom(denom) || AccAddress.validate(denom);

  try {
    const coins = new Coins(tokens);
    return coins.toArray().every(validate);
  } catch {
    return false;
  }
};

export const TxMessage = ({ text, targetAddress }: TxMessageProps) => {
  const networkName = useNetworkName();

  const parse = (word: string, index: number): ReactNode => {
    if (!word) return null;
    if (word === targetAddress) return 'treasury';

    if (word.endsWith(',')) return <>{parse(word.slice(0, -1), index)},</>;

    if (validateTokens(word)) {
      const list = new Coins(word).toArray();

      return (
        <span style={{ color: 'purple' }}>
          {list.length > 1
            ? 'multiple tokens'
            : list.map((coin, index) => {
                // todo: style address
                const denom = coin.toData().denom;
                const [amount] = word.split(denom);
                return <TxAsset amount={amount} id={denom} />;
              })}
        </span>
      );
    }

    if (AccAddress.validate(word)) {
      return (
        <ExternalLink to={`https://terrasco.pe/${networkName}/address/${word}`}>
          <ShyTextButton text={truncateAddress(word)} as="div" />
        </ExternalLink>
      );
    }

    if (index === 0) {
      return capitalizeFirstLetter(word);
    }

    return <span>{word}</span>;
  };
  return (
    <Text as="div" style={{ textAlign: 'start' }} color="supporting">
      <HStack alignItems="center" gap={4}>
        {text.split(' ').map((word, index) => {
          const parsed = parse(word, index);

          return <span key={index}>{parsed}</span>;
        })}
      </HStack>
    </Text>
  );
};
