import { CoverImage } from 'lib/ui/images/CoverImage';
import { ImageHolder } from 'lib/ui/images/ImageHolder';
import { SafeImage } from 'lib/ui/images/SafeImage';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';

interface Props {
  address: string;
  imageUri?: string;
  name?: string;
}

export const NftOption = ({ address, imageUri, name }: Props) => {
  return (
    <HStack alignItems="center" gap={8}>
      <ImageHolder style={{ borderRadius: 4 }} width={40} height={40}>
        <SafeImage src={imageUri} render={(props) => <CoverImage {...props} />} />
      </ImageHolder>

      <VStack>
        <Text>{name}</Text>
        <Text cropped size={12} color="supporting">
          {address}
        </Text>
      </VStack>
    </HStack>
  );
};
