import { UnstyledAnchor } from './UnstyledAnchor';
import { useNavigate } from 'react-router';
import { handleWithPreventDefault } from 'lib/shared/events';

type Props = React.ComponentProps<typeof UnstyledAnchor> & {
  to: string;
  onClick?: () => void;
};

export const InternalLink = ({ to, onClick, ...rest }: Props) => {
  const navigate = useNavigate();
  return (
    <UnstyledAnchor
      onClick={handleWithPreventDefault(() => {
        navigate(to);
        onClick?.();
      })}
      href={to}
      {...rest}
    />
  );
};
