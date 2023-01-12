import { Token } from 'types/Token';

interface SelectAssetStepProps {
  onSelect: (token: Token) => void;
  onCancel: () => void;
}

export const SelectAssetStep = ({ onSelect, onCancel }: SelectAssetStepProps) => {
  return <p>coming soon!</p>;
};
