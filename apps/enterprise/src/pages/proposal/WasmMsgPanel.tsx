import { useState } from 'react';
import { Stack } from 'lib/ui/Stack';
import { Panel } from 'components/panel';
import { Text } from 'components/primitives';
import { useClipboardCopy } from 'hooks';
import styles from './WasmMsgPanel.module.sass';
import { HStack, VStack } from 'lib/ui/Stack';
import { WasmMsgSummary } from './WasmMsgSummary/WasmMsgSummary';
import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { CosmWasmMsg } from 'chain/CosmWasm';
import { fromBase64 } from 'chain/utils/fromBase64';
import { Button } from 'lib/ui/buttons/Button';

export type WasmMsgPanelProps = {
  msg: string;
};

export const encodedWasmFields = ['execute', 'instantiate', 'migrate'] as const;

const formatMsg = (value: string, showDecoded: boolean) => {
  const result: CosmWasmMsg = JSON.parse(value);
  if ('wasm' in result && showDecoded) {
    encodedWasmFields.forEach((fieldName) => {
      if (fieldName in result.wasm) {
        // @ts-ignore
        const field = result.wasm[fieldName];
        if (field) {
          field.msg = fromBase64(field.msg);
        }
      }
    });
  }
  return result;
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
        <WasmMsgSummary msg={JSON.parse(msg)} />
      </ErrorBoundary>
      <Panel className={styles.root}>
        <Stack className={styles.top} direction="row">
          <Text variant="label">Wasm message</Text>
          <HStack>
            <Button
              kind="secondary"
              onClick={() => copy({ value: JSON.stringify(msg, null, 2), message: 'Message copied to clipboard' })}
            >
              Copy
            </Button>
            <Button kind="secondary" onClick={toggleDecoded} className={styles.showDecoded}>
              {showDecoded ? 'Show Base64' : 'Show Decoded'}
            </Button>
          </HStack>
        </Stack>
        <pre className={styles.message}>{JSON.stringify(formatMsg(msg, showDecoded), null, 4)}</pre>
      </Panel>
    </VStack>
  );
};
