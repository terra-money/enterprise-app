import { useState } from 'react';
import { Container } from '@terra-money/apps/components';
import { Panel } from 'components/panel';
import { Button, Text } from 'components/primitives';
import { useClipboardCopy } from 'hooks';
import { encodedWasmFields, ExecuteMsgInput } from 'pages/create-proposal/execute/helpers/toExecuteMsg';
import styles from './WasmMsgPanel.module.sass';
import { HStack, VStack } from 'lib/ui/Stack';
import { WasmMsgSummary } from './WasmMsgSummary/WasmMsgSummary';
import { ErrorBoundary } from 'errors/components/ErrorBoundary';

export type WasmMsgPanelProps = {
  msg: string;
};

const formatMsg = (value: string, showDecoded: boolean) => {
  const result: ExecuteMsgInput = JSON.parse(value);
  if (result.wasm && showDecoded) {
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
  const [showDecoded, setShowDecoded] = useState(false);

  const toggleDecoded = () => {
    setShowDecoded(!showDecoded);
  };

  return (
    <VStack gap={4}>
      <ErrorBoundary>
        <WasmMsgSummary msg={formatMsg(msg, true)} />
      </ErrorBoundary>
      <Panel className={styles.root}>
        <Container className={styles.top} direction="row">
          <Text variant="label">Wasm message</Text>
          <HStack>
            <Button
              variant="secondary"
              onClick={() => copy({ value: JSON.stringify(msg, null, 2), message: 'Message copied to clipboard' })}
            >
              Copy
            </Button>
            <Button variant="secondary" onClick={toggleDecoded} className={styles.showDecoded}>
              {showDecoded ? 'Show Base64' : 'Show Decoded'}
            </Button>
          </HStack>
        </Container>
        <pre className={styles.message}>{JSON.stringify(formatMsg(msg, showDecoded), null, 4)}</pre>
      </Panel>
    </VStack>
  );
};
