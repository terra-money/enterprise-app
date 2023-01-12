import { Token } from 'types';

interface DepositAssetStepProps {
  token: Token;
  onSuccess: () => void;
  onBack: () => void;
}

export const DepositAssetStep = ({ token, onSuccess, onBack }: DepositAssetStepProps) => {
  return <p>coming soon!</p>;
};
