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
  const [messages, setMessages] = useState<string>('');

  const messageError = useMemo(() => validateWasmMsg(messages), [messages]);
  const isMessageValid = useMemo(() => !messageError, [messageError]);  

  const submitDisabled = !isMessageValid;

  return (
    <ProposalForm
      disabled={submitDisabled}
      getProposalActions={() => [{
        execute_msgs: {
          // temporarily disable action_type until contract migrations
          // action_type: 'execute',
          msgs: toExecuteMsg(messages)
        }
      }]}
    >
      <div className={styles.root}>
        <div className={styles.section}>
          <WasmMsgInput
            label="Custom message"
            error={messageError}
            valid
            placeholder="Type your message here"
            value={messages}
            onChange={(value) => setMessages(value ? value : '')}
          />
        </div>
        {isMessageValid && <AddButton onClick={() => setMessages(messages)} />}
      </div>
    </ProposalForm>
  );
};
