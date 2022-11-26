import { Text } from 'components/primitives';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './ExecuteMessagesProposalAction.module.sass';
import { WasmMsgPanel } from './WasmMsgPanel';

export const ExecuteMessagesProposalAction = () => {
  const { proposal_actions } = useCurrentProposal();

  const action = proposal_actions.find((action) => 'execute_msgs' in action);
  if (!action) return null;

  const executeMsgAction = 'execute_msgs' in action ? action.execute_msgs : undefined;
  if (!executeMsgAction) return null;

  return (
    <div className={styles.root}>
      <Text variant="heading4">Execute Messages</Text>
      {executeMsgAction.msgs.map((message, index) => (
        <WasmMsgPanel key={index} msg={message} />
      ))}
    </div>
  );
};
