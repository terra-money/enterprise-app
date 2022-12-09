import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { DAOCard } from 'pages/shared/DAOCard';
import { DAO } from 'types';

interface ListProps {
  className?: string;
  items: DAO[];
  isLoading: boolean;
}

export const List = (props: ListProps) => {
  const { items, isLoading } = props;

  return (
    <SameWidthChildrenRow gap={16} maxColumns={3} fullWidth minChildrenWidth={320}>
      {items.map((dao, index) => (
        <DAOCard key={index} dao={dao} skeleton={isLoading} />
      ))}
    </SameWidthChildrenRow>
  );
};
