import { Text } from 'lib/ui/Text';
import { enterprise } from 'types/contracts';
import { SeparatedBy, dotSeparator } from 'lib/ui/SeparatedBy';
import { VStack } from 'lib/ui/Stack';

interface StepLabelProps<T> {
  steps: T[];
  type?: enterprise.DaoType;
  description?: string;
}

export function StepLabel<T>(props: StepLabelProps<T>) {
  const { steps, type, description } = props;

  const typeDescription =
    type === undefined
      ? undefined
      : type === 'multisig'
      ? 'Multisig DAO'
      : type === 'nft'
      ? 'NFT Community DAO'
      : 'Community Token DAO';

  const subTitle = description !== undefined ? description : typeDescription;

  return (
    <VStack>
      <SeparatedBy separator={dotSeparator}>
        <Text size={14} color="supporting">{`Step ${steps.length}`}</Text>
        <Text size={14}>{subTitle}</Text>
      </SeparatedBy>
    </VStack>
  );
}
