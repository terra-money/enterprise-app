import { ComponentWithChildrenProps } from 'lib/shared/props';
import { NavLink } from 'react-router-dom';
import { HStack, VStack } from './Stack';
import { Text } from './Text';

interface Props extends ComponentWithChildrenProps {
  name: string;
}

const navLinkStyle = {
  textDecoration: 'none',
  color: '#75808A',
};
export const LabeledPageSection = ({ children, name }: Props) => {
  return (
    <VStack gap={16}>
      <HStack justifyContent={'space-between'}>
        <Text size={18} weight="semibold">
          {name}
        </Text>
        {name === 'Top DAOs' && (
          <NavLink style={navLinkStyle} to={'/daos'}>
            All DAOs
          </NavLink>
        )}
      </HStack>
      {children}
    </VStack>
  );
};
