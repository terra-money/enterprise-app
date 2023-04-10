import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { toDao } from 'dao/utils/toDao';
import { TitledContent } from 'lib/ui/Layout/TitledContent';
import { Panel } from 'lib/ui/Panel/Panel';
import { Text } from 'lib/ui/Text';
import { fromDao, govConfigViewFieldNameRecord } from 'pages/proposal/helpers/govConfigView';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 228px 1fr;
  font-size: 14px;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
`;
export const GovernanceOverview = () => {
  const dao = useCurrentDao();
  const configView = fromDao(toDao(dao));

  return (
    <Panel>
      <TitledContent title="Governance">
        <Container>
          {Object.entries(configView).map(([name, value]) => {
            return (
              <React.Fragment key={name}>
                <Text color="supporting">{govConfigViewFieldNameRecord[name] || name}:</Text>
                <Text>{value}</Text>
              </React.Fragment>
            );
          })}
        </Container>
      </TitledContent>
    </Panel>
  );
};
