import { Text } from 'lib/ui/Text';
import { ExternalLink } from 'components/link';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { discordUrl, telegramUrl } from 'navigation';
import { VStack } from 'lib/ui/Stack';

export const SupportContacts = () => {
  return (
    <VStack gap={4}>
      <Text>We are working on fixing this error.</Text>
      <Text>
        Contact us on{' '}
        <ExternalLink to={discordUrl}>
          <ShyTextButton as="div" text="Discord" />
        </ExternalLink>{' '}
        or{' '}
        <ExternalLink to={telegramUrl}>
          <ShyTextButton as="div" text="Telegram" />
        </ExternalLink>{' '}
        if the problem persists.
      </Text>
    </VStack>
  );
};
