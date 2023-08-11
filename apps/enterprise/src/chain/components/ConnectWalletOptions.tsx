import { useWallet } from '@terra-money/wallet-kit';
import { Button } from 'lib/ui/buttons/Button';
import { TerraStationIcon } from 'lib/ui/icons/TerraStationIcon';
import { WalletConnectIcon } from 'lib/ui/icons/WalletConnectIcon';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { ReactNode } from 'react';

const supportedConnections = ['station-extension', 'terra-station-mobile'] as const;
type SupportedConnection = (typeof supportedConnections)[number];

const supportedConnectionIcons: Record<SupportedConnection, ReactNode> = {
  'station-extension': <TerraStationIcon />,
  'terra-station-mobile': <WalletConnectIcon />,
};

const supportedConnectionNames: Record<SupportedConnection, string> = {
  'station-extension': 'Station Wallet',
  'terra-station-mobile': 'Wallet Connect (Mobile)',
};

export const ConnectWalletOptions = () => {
  const { connect, availableWallets } = useWallet();

  const connections = availableWallets.filter((connection) =>
    supportedConnections.includes(connection.id as SupportedConnection)
  );

  return (
    <VStack gap={12}>
      {connections.map(({ id }) => (
        <Button size="l" style={{ justifyContent: 'start' }} onClick={() => connect(id)} kind="secondary">
          <HStack alignItems="center" gap={8}>
            {supportedConnectionIcons[id as SupportedConnection]}
            <Text>{supportedConnectionNames[id as SupportedConnection]}</Text>
          </HStack>
        </Button>
      ))}
    </VStack>
  );
};
