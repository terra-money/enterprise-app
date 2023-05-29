import { ConnectType, useWallet } from '@terra-money/wallet-provider';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { TerraStationIcon } from 'lib/ui/icons/TerraStationIcon';
import { WalletConnectIcon } from 'lib/ui/icons/WalletConnectIcon';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { ReactNode } from 'react';

const supportedConnections = [ConnectType.EXTENSION, ConnectType.WALLETCONNECT] as const;
type SupportedConnection = (typeof supportedConnections)[number];

const supportedConnectionIcons: Record<SupportedConnection, ReactNode> = {
  [ConnectType.EXTENSION]: <TerraStationIcon />,
  [ConnectType.WALLETCONNECT]: <WalletConnectIcon />,
};

const supportedConnectionNames: Record<SupportedConnection, string> = {
  [ConnectType.EXTENSION]: 'Station Wallet',
  [ConnectType.WALLETCONNECT]: 'Wallet Connect',
};

export const ConnectWalletOptions = () => {
  const { connect, availableConnections } = useWallet();

  const connections = availableConnections.filter((connection) =>
    supportedConnections.includes(connection.type as SupportedConnection)
  );

  return (
    <VStack gap={12}>
      {connections.map(({ type }) => (
        <PrimaryButton
          size="l"
          isRounded
          style={{ justifyContent: 'start' }}
          onClick={() => connect(type)}
          kind="secondary"
        >
          <HStack alignItems="center" gap={8}>
            {supportedConnectionIcons[type as SupportedConnection]}
            <Text>{supportedConnectionNames[type as SupportedConnection]}</Text>
          </HStack>
        </PrimaryButton>
      ))}
    </VStack>
  );
};
