import { useAllDaosQuery } from 'dao/hooks/useAllDaosQuery';
import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { DAOCard } from 'pages/shared/DAOCard';

const LIMIT = 6;

export const RecentDAOs = () => {

  const { data = [], isLoading } = useAllDaosQuery();

  const daos = data
    .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0))
    .slice(0, 6);

  return (
    <LabeledPageSection name="Top DAOs by TVL">
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
