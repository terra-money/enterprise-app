import styled from 'styled-components';
import { getColor } from 'lib/ui/theme/getters';

interface StepProgressProps {
  percentageComplete: number;
}

const Container = styled.div`
  width: 100%;
  min-height: 8px;
  height: 8px;
`;

const Fill = styled.div`
  height: 100%;
  background: ${getColor('white')};
  border-radius: 8px;
`;

export const StepProgress = (props: StepProgressProps) => {
  const { percentageComplete } = props;
  return (
    <Container>
      <Fill style={{ width: `${percentageComplete}%` }} />
    </Container>
  );
};
