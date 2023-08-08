import { Text } from 'lib/ui/Text';
import { ReactComponent as LogoIcon } from 'components/assets/LogoSmall.svg';
import { Stack } from 'lib/ui/Stack';
import styled from 'styled-components';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { getColor } from 'lib/ui/theme/getters';

interface LogoProps {
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}

const Container = styled.div`
  ${getSameDimensionsCSS(48)};
  ${roundedCSS};
  ${centerContentCSS};
  font-size: 24px;
  color: ${getColor('background')};
  background: ${getColor('contrast')};
`;

export const Logo = (props: LogoProps) => {
  const { compact = false, onClick } = props;

  return (
    <Stack alignItems="center" direction="row" gap={24}>
      <Container onClick={() => onClick && onClick()}>
        <LogoIcon />
      </Container>

      {compact === false && (
        <Text size={24} weight="bold">
          Enterprise
        </Text>
      )}
    </Stack>
  );
};
