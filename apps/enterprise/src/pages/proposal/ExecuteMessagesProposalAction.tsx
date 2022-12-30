import { Text } from 'components/primitives';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';
import styles from './ExecuteMessagesProposalAction.module.sass';
import { WasmMsgPanel } from './WasmMsgPanel';

export const ExecuteMessagesProposalAction = () => {
  const { msg } = useCurrentProposalAction();

  return (
    <div className={styles.root}>
      <Text variant="heading4">Execute Messages</Text>
      {(msg as enterprise.ExecuteMsgsMsg).msgs.map((message, index) => (
        <WasmMsgPanel key={index} msg={message} />
      ))}
    </div>
  );
};
