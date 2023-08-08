import { Path } from 'navigation';
import { HStack } from 'lib/ui/Stack';
import { InternalLink } from 'components/link';
import { Button } from 'lib/ui/buttons/Button';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';

export const DesktopNavigation = () => {
  return (
    <HStack gap={16} alignItems="center">
      <Button
        onClick={() => {
          const element = document.querySelector('#featuresExplorer');

          element?.scrollIntoView({
            behavior: 'smooth',
          });
        }}
        kind="ghost"
      >
        Features
      </Button>

      <ExternalLink to="https://docs.enterprise.money">
        <Button as="div" kind="ghost">
          Docs
        </Button>
      </ExternalLink>

      <InternalLink to={Path.Dashboard}>
        <Button as="div" kind="ghost">
          App
        </Button>
      </InternalLink>
    </HStack>
  );
};
