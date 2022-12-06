import { IconButton } from 'components/primitives';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { ReactComponent as PlusIcon } from 'components/assets/Plus.svg';
import styled from 'styled-components';
import { Path } from 'navigation';

const Button = styled(IconButton)`
  font-size: 12px;
`;

export const CreateDaoButton = () => {
  return (
    <InternalLink to={Path.CreateDao}>
      <Button variant="primary">
        <PlusIcon />
      </Button>
    </InternalLink>
  );
};
