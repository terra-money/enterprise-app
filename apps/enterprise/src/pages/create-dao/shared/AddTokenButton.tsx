import { AddButton } from 'components/add-button';
import { useTokenListDialog } from 'components/token-list';
import { Token } from 'types';

interface AddTokenButtonProps {
  onSelect: (token: Token) => void;
}

export const AddTokenButton = ({ onSelect }: AddTokenButtonProps) => {
  const openTokenList = useTokenListDialog();

  return (
    <AddButton
      onClick={() =>
        openTokenList().then((token) => {
          if (token) {
            onSelect(token);
          }
        })
      }
    />
  );
};
