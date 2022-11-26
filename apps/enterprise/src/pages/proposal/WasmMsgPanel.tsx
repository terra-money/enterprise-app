import { Container } from '@terra-money/apps/components';
import { Panel } from 'components/panel';
import { Button, Text } from 'components/primitives';
import { useClipboardCopy } from 'hooks';
import { encodedWasmFields, ExecuteMsgInput } from 'pages/create-proposal/execute/helpers/toExecuteMsg';
import styles from './WasmMsgPanel.module.sass';

export type WasmMsgPanelProps = {
  msg: string;
};

const formatMsg = (value: string) => {
  const result: ExecuteMsgInput = JSON.parse(value);
  if (result.wasm) {
    encodedWasmFields.forEach((fieldName) => {
      const field = result.wasm?.[fieldName];
      if (field) {
        field.msg = fromBase64(field.msg);
      }
    });
  }

  return result;
};

const fromBase64 = (value: string) => {
  return JSON.parse(Buffer.from(value, 'base64').toString());
};

export const WasmMsgPanel = ({ msg }: WasmMsgPanelProps) => {
  const copy = useClipboardCopy();

  return (
    <Panel className={styles.root}>
      <Container className={styles.top} direction="row">
        <Text variant="label">Wasm message</Text>
        <Button
          variant="secondary"
          onClick={() => copy({ value: JSON.stringify(msg, null, 2), message: 'Message copied to clipboard' })}
        >
          Copy
        </Button>
      </Container>
      <pre className={styles.message}>{JSON.stringify(formatMsg(msg), null, 4)}</pre>
    </Panel>
  );
};
