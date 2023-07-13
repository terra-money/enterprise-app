import styled from 'styled-components';
import { ManageWallet } from './ManageWallet';

const Container = styled.div`
  position: absolute;
  right: 48px;
  top: 48px;
`;

export const StickyWalletManager = () => (
  <Container>
    <ManageWallet />
  </Container>
);
