import { Text } from 'lib/ui/Text';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';
import { WasmMsgPanel } from './WasmMsgPanel';
import { VStack } from 'lib/ui/Stack';

export const ExecuteMessagesProposalAction = () => {
  const { msg } = useCurrentProposalAction();

  return (
    <VStack gap={24}>
      <Text weight="semibold">Execute Messages</Text>
      {(msg as enterprise.ExecuteMsgsMsg).msgs.map((message, index) => (
        <WasmMsgPanel key={index} msg={message} />
      ))}
    </VStack>
  );
};
