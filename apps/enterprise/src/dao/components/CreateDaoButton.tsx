import { IconButton } from 'components/primitives';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { ReactComponent as PlusIcon } from 'components/assets/Plus.svg';
import styled from 'styled-components';
import { Path } from 'navigation';

const Button = styled(IconButton)`
  font-size: 12px;
`;

interface CreateDaoButtonProps { 
  disabled: any;
}

export const CreateDaoButton = ({disabled}: CreateDaoButtonProps) => {
  return (
    <InternalLink to={Path.CreateDao}>
      <Button variant="primary" disabled={disabled}>
        <PlusIcon />
      </Button>
    </InternalLink>
  );
};
