import { removeByIndex, updateAtIndex } from '@terra-money/apps/utils';
import { WasmMsgInput } from 'components/wasm-msg-input';
import { useMemo, useState } from 'react';
import { ProposalForm } from '../shared/ProposalForm';
import { toExecuteMsg } from './helpers/toExecuteMsg';
import { validateWasmMsg } from './helpers/validateWasmMsg';
import styles from './ExecuteMessageProposalForm.module.sass';
import { AddButton } from 'components/add-button';
import { DeleteIconButton } from 'components/delete-icon-button';

export const ExecuteMessageProposalForm = () => {
  const [messages, setMessages] = useState<string[]>(['']);

  const messagesErrors = useMemo(() => messages.map(validateWasmMsg), [messages]);
  const areMessagesValid = useMemo(() => messagesErrors.every((e) => !e), [messagesErrors]);

  const submitDisabled = !areMessagesValid;

  return (
    <ProposalForm
      disabled={submitDisabled}
      getProposalActions={() => [{ execute_msgs: { msgs: messages.map(toExecuteMsg), action_type: 'execute' } }]}
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
              onChange={(value) => setMessages(updateAtIndex(messages, index, value || ''))}
            />
            <DeleteIconButton className={styles.button} onClick={() => setMessages(removeByIndex(messages, index))} />
          </div>
        ))}
        {areMessagesValid && <AddButton onClick={() => setMessages([...messages, ''])} />}
      </div>
    </ProposalForm>
  );
};
