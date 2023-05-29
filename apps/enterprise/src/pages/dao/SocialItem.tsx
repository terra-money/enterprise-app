import { ReactNode } from 'react';
import { HStack } from 'lib/ui/Stack';
import { ExternalLink } from 'components/link';
import { defaultTransitionCSS } from 'lib/ui/animations/transitions';
import styled from 'styled-components';
import { getLast } from 'lib/shared/utils/getlast';
import { Text } from 'lib/ui/Text';

interface SocialItemProps {
  icon: ReactNode;
  username: string;
  getUrl: (username: string) => string;
}

const sanitizeUsername = (username: string) => getLast(username.split('/'));
const isLink = (value: string) => {
  const validStarts = ['http', 'https', 'www'];
  return validStarts.some((start) => value.startsWith(start));
};

const Container = styled(ExternalLink)`
  ${defaultTransitionCSS};

  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  :hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`;

export const SocialItem = ({ icon, username, getUrl }: SocialItemProps) => {
  const to = isLink(username) ? username : getUrl(username);

  return (
    <Container to={to}>
      <HStack alignItems="center" gap={8}>
        {icon}
        <Text>{sanitizeUsername(username)}</Text>
      </HStack>
    </Container>
  );
};
