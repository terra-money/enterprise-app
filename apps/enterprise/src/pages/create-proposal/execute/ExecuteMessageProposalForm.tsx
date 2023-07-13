import { WasmMsgInput } from 'components/wasm-msg-input';
import { useMemo, useState } from 'react';
import { ProposalForm } from '../shared/ProposalForm';
import { validateWasmMsg } from './helpers/validateWasmMsg';
import styles from './ExecuteMessageProposalForm.module.sass';
import { removeAtIndex } from 'lib/shared/utils/removeAtIndex';
import { updateAtIndex } from 'lib/shared/utils/updateAtIndex';
import { AddButton } from 'lib/ui/buttons/AddButton';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';

export const ExecuteMessageProposalForm = () => {
  const [messages, setMessages] = useState<string[]>(['']);

  const messagesErrors = useMemo(() => messages.map(validateWasmMsg), [messages]);
  const areMessagesValid = useMemo(() => messagesErrors.every((e) => !e), [messagesErrors]);

  const submitDisabled = !areMessagesValid;

  return (
    <ProposalForm
      disabled={submitDisabled}
      getProposalActions={() => [{ execute_msgs: { msgs: messages, action_type: 'execute' } }]}
    >
      <div className={styles.root}>
        {messages.map((message, index) => (
          <div className={styles.section}>
            <WasmMsgInput
              label="Custom message"
              error={messagesErrors[index]}
              valid
              placeholder="Enter your message here"
              value={message}
              onChange={(value) => setMessages(updateAtIndex(messages, index, () => value || ''))}
            />
            <DeleteButton
              size="l"
              className={styles.button}
              onClick={() => setMessages(removeAtIndex(messages, index))}
            />
          </div>
        ))}
        {areMessagesValid && <AddButton size="l" onClick={() => setMessages([...messages, ''])} />}
      </div>
    </ProposalForm>
  );
};
