import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { hideScrollbarsCSS } from 'lib/ui/utils/hideScrollbarsCSS';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled(HStack)`
  gap: 4px;
  overflow-x: auto;

  ${hideScrollbarsCSS};
`;

const NavigationItem = styled(NavLink)`
  ${roundedCSS}
  padding: 0 16px;
  text-decoration: none;
  ${centerContentCSS};
  font-size: 14px;
  font-weight: 500;
  height: 48px;

  :hover {
    background: ${({ theme }) => theme.colors.foregroundAltHover.toCssValue()};
  }

  &.active {
    background: ${({ theme }) => theme.colors.foregroundAlt.toCssValue()};
  }
`;

const daoView = ['overview', 'treasury', 'proposals', 'staking', 'members'] as const;
type DaoView = typeof daoView[number];

const daoViewName: Record<DaoView, string> = {
  overview: 'Overview',
  treasury: 'Treasury',
  proposals: 'Proposals',
  staking: 'Staking',
  members: 'Members',
};

const daoViewPath: Record<DaoView, string> = {
  overview: '',
  treasury: 'treasury',
  proposals: 'proposals',
  staking: 'staking',
  members: 'members',
};

export const DaoNavigation = () => {
  const refs = useRef<HTMLAnchorElement[]>([]);
  const dao = useCurrentDao();
  const options =
    dao.type === 'multisig' ? daoView.filter((v) => v !== 'staking') : daoView.filter((v) => v !== 'members');

  return (
    <Container>
      {options.map((view, index) => (
        <NavigationItem
          end={daoViewPath[view] === '' ? true : undefined}
          ref={(element) => {
            if (element) {
              refs.current[index] = element;
            }
          }}
          to={daoViewPath[view]}
          key={view}
          onClick={() => {
            const element = refs.current[index];
            element?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }}
        >
          {({ isActive }) => <Text color={isActive ? 'gradient' : 'supporting'}>{daoViewName[view]}</Text>}
        </NavigationItem>
      ))}
    </Container>
  );
};
