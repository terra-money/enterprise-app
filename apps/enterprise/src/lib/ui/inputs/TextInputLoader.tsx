import styled from 'styled-components';
import { Spinner } from 'lib/ui/Spinner';
import { commonInputCSS } from './TextInput';

const Container = styled.div`
  ${commonInputCSS};
`;

export const TextInputLoader = () => (
  <Container isValid>
    <Spinner />
  </Container>
);
