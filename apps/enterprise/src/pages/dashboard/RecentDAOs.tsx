import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { DAOCard } from 'pages/shared/DAOCard';
import { QUERY_KEY, useDAOsQuery } from 'queries';

const LIMIT = 6;

export const RecentDAOs = () => {
  const { data: daos = [], isLoading } = useDAOsQuery({
    limit: LIMIT,
    direction: 'desc',
    queryKey: QUERY_KEY.RECENT_DAOS,
  });

  if (isLoading === false && daos.length === 0) {
    return null;
  }

  return (
    <LabeledPageSection name="Recent DAOs">
      <SameWidthChildrenRow maxColumns={3} fullWidth minChildrenWidth={320} gap={16}>
        {isLoading ? (
          <>
            {[...Array(LIMIT)].map((_, index) => {
              return <DAOCard key={index} skeleton={true} />;
            })}
          </>
        ) : (
          <>
            {daos.map((dao, index) => (
              <DAOCard key={index} dao={dao} skeleton={false} />
            ))}
          </>
        )}
      </SameWidthChildrenRow>
    </LabeledPageSection>
  );
};
