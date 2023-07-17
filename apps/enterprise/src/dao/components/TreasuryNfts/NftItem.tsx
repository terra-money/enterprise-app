import { formatAmount } from 'lib/shared/utils/formatAmount';import { NftWithPrice } from 'chain/Nft';
import { getNftInfo } from 'chain/utils/getNftInfo';
import { retry } from 'lib/shared/utils/retry';
import { Panel } from 'lib/ui/Panel/Panel';
import { SafeImage } from 'lib/ui/SafeImage';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { CoverImage } from 'lib/ui/images/CoverImage';
import { getColor } from 'lib/ui/theme/getters';
import { QUERY_KEY } from 'queries/queryKey';
import { useQuery } from 'react-query';
import styled from 'styled-components';

interface NftItemProps extends NftWithPrice {}

const Container = styled(Panel)`
  padding: 0;
`;

const Info = styled.div`
  padding: 24px;
`;

const ImageWr = styled.div`
  aspect-ratio: 1/1;
  width: 100%;
  background: ${getColor('mist')};
`;

export const NftItem = ({ usd, ...nft }: NftItemProps) => {
  const {
    data: info,
    isLoading,
    isError,
  } = useQuery([QUERY_KEY.NFT_INFO, nft], async () => {
    return retry({
      func: () => getNftInfo(nft),
      delay: 5000,
    });
  });

  return (
    <Container>
      <ImageWr>
        <SafeImage src={info?.image} render={(props) => <CoverImage {...props} />} />
      </ImageWr>
      <Info>
        <VStack gap={16}>
          <Text cropped weight="semibold" color="supporting">
            {isLoading ? 'Loading...' : isError ? 'Failed to load' : info?.name}
          </Text>
          <Text weight="semibold" size={20}>
            ${formatAmount(usd || 0)}
          </Text>
        </VStack>
      </Info>
    </Container>
  );
};
