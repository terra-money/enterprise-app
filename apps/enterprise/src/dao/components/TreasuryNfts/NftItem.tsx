import { formatAmount } from "@terra-money/apps/libs/formatting";
import { NftInfoWithPrice } from "chain/Nft";
import { Panel } from "lib/ui/Panel/Panel";
import { SafeImage } from "lib/ui/SafeImage";
import { VStack } from "lib/ui/Stack";
import { Text } from "lib/ui/Text";
import { CoverImage } from "lib/ui/images/CoverImage";
import styled from "styled-components";

interface NftItemProps extends NftInfoWithPrice { }

const Container = styled(Panel)`
  padding: 0;
`

const Info = styled.div`
  padding: 24px;
`

const ImageWr = styled.div`
  aspect-ratio: 1/1;
  width: 100%;
`

export const NftItem = ({ collection, id, image, usd }: NftItemProps) => {
  return (
    <Container>
      <ImageWr>
        <SafeImage
          src={image}
          render={(props) => <CoverImage {...props} />}
        />
      </ImageWr>
      <Info>
        <VStack gap={16}>
          <Text cropped weight='semibold' color="supporting">{id}</Text>
          {usd && (
            <Text weight="semibold" size={20}>
              ${formatAmount(usd)}
            </Text>
          )}
        </VStack>
      </Info>
    </Container>
  )
}