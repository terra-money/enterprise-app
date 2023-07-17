import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { DAO } from 'types';
import { FavouriteToggle } from 'components/favourite-toggle';
import { DAOLogo } from 'components/dao-logo';
import { enterprise } from 'types/contracts';
import { SeparatedBy, dotSeparator } from 'lib/ui/SeparatedBy';
import { Tooltip } from 'lib/ui/Tooltip';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { Panel } from 'lib/ui/Panel/Panel';
import styled from 'styled-components';
import { getColor } from 'lib/ui/theme/getters';
import { defaultTransitionCSS } from 'lib/ui/animations/transitions';
import { ActionInsideInteractiveElement } from 'lib/ui/ActionInsideInteractiveElement';
import { Spacer } from 'lib/ui/Spacer';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { getDaoPath } from 'navigation';
import { croppedTextCSS } from 'lib/ui/utils/croppedTextCSS';

interface DAOCardProps {
  dao: DAO;
}

const daoTypeName: Record<enterprise.DaoType, string> = {
  multisig: 'Multisig',
  nft: 'NFT',
  token: 'Token',
};

const Container = styled(Panel)`
  width: 100%;
  cursor: pointer;
  ${defaultTransitionCSS};
  &:hover {
    background: ${getColor('mistExtra')};
  }
`;

const Content = styled(HStack)`
  ${croppedTextCSS};
`;

export const DAOCard = (props: DAOCardProps) => {
  const { dao } = props;

  const { tvl } = dao;

  return (
    <>
      <ActionInsideInteractiveElement
        render={({ actionSize }) => (
          <InternalLink style={{ width: '100%' }} to={getDaoPath(dao.address)}>
            <Container>
              <HStack gap={20} alignItems="center" justifyContent="space-between">
                <Content alignItems="center" gap={20}>
                  <DAOLogo logo={dao.logo} />
                  <VStack>
                    <Text cropped weight="semibold" size={14}>
                      {dao.name}
                    </Text>
                    <SeparatedBy separator={dotSeparator}>
                      <Text size={14} weight="semibold" color="supporting">
                        {daoTypeName[dao.type]}
                      </Text>
                      {tvl && tvl > 0 && (
                        <Tooltip
                          content="Total value locked"
                          renderOpener={(props) => (
                            <Text {...props} size={14} weight="semibold" color="supporting">
                              ${formatAmount(tvl)}
                            </Text>
                          )}
                        />
                      )}
                    </SeparatedBy>
                  </VStack>
                </Content>
                <Spacer {...actionSize} />
              </HStack>
            </Container>
          </InternalLink>
        )}
        actionPlacerStyles={{
          right: 20,
        }}
        action={<FavouriteToggle dao={dao} />}
      />
    </>
  );
};
