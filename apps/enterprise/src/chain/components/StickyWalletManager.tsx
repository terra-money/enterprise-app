import styled from 'styled-components';
import { ManageWallet } from './ManageWallet';

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export const StickyWalletManager = () => (
  <Container>
    <ManageWallet />
  </Container>
);
