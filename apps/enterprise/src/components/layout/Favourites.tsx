import { DAOLogo } from 'components/dao-logo';
import { VStack } from 'lib/ui/Stack';
import { usePersonalization } from 'libs/personalization/PersonalizationProvider';
import { Tooltip } from 'lib/ui/Tooltip';
import { InternalLink } from 'components/link';

export const Favourites = () => {
  const [{ favourites }] = usePersonalization();

  return (
    <VStack gap={12}>
      {favourites.map((favourite, index) => {
        return (
          <InternalLink key={index} to={`/dao/${favourite.address}`}>
            <Tooltip
              placement="right"
              content={favourite.name}
              renderOpener={(props) => (
                <div {...props}>
                  <DAOLogo logo={favourite.logo} />
                </div>
              )}
            />
          </InternalLink>
        );
      })}
    </VStack>
  );
};
