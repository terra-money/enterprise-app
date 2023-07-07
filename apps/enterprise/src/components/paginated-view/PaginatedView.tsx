import { ReactNode, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import styles from './PaginatedView.module.sass';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';

interface Props {
  children: ReactNode;
  isLoading?: boolean;
  onRequestToLoadMore: () => void;
}

export const PaginatedView = ({ children, isLoading, onRequestToLoadMore }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '200px',
    threshold: 0,
  });

  useEffect(() => {
    if (intersection?.isIntersecting && !isLoading) {
      onRequestToLoadMore();
    }
  }, [intersection?.isIntersecting, onRequestToLoadMore, isLoading]);

  return (
    <>
      {children}
      <div className={styles.root}>
        <div ref={ref} />
        {isLoading && (
          <div className={styles.loaderContainer}>
            <Spinner />
            <Text>Loading</Text>
          </div>
        )}
      </div>
    </>
  );
};
