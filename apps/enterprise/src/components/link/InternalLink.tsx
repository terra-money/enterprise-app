import { useNavigate } from 'react-router';
import { UnstyledAnchor, UnstyledAnchorProps } from './UnstyledAnchor';
import { handleWithPreventDefault } from 'lib/shared/events';

interface InternalLinkProps extends UnstyledAnchorProps {
  to: string;
}

export const InternalLink = ({ to, onClick, ...rest }: InternalLinkProps) => {
  const navigate = useNavigate();
  return (
    <UnstyledAnchor
      onClick={handleWithPreventDefault((event) => {
        navigate(to);
        onClick?.(event);
      })}
      href={to}
      {...rest}
    />
  );
};
