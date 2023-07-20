import { useState } from 'react';
import { Stack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import styles from './WasmMsgPanel.module.sass';
import { HStack, VStack } from 'lib/ui/Stack';
import { WasmMsgSummary } from './WasmMsgSummary/WasmMsgSummary';
import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { CosmWasmMsg } from 'chain/CosmWasm';
import { fromBase64 } from 'chain/utils/fromBase64';
import { Button } from 'lib/ui/buttons/Button';
import { Panel } from 'lib/ui/Panel/Panel';
import { CopyButton } from 'lib/ui/buttons/CopyButton';

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
          <Text size={14} color="supporting">
            Wasm message
          </Text>
          <HStack alignItems="center" gap={16}>
            <CopyButton kind="secondary" content={JSON.stringify(msg, null, 2)} />
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
