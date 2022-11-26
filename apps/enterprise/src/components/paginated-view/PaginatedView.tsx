import { ReactNode, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import styles from './PaginatedView.module.sass';
import { Text, Throbber } from 'components/primitives';

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
            <Throbber variant="secondary" size="small" />
            <Text variant="text">Loading</Text>
          </div>
        )}
      </div>
    </>
  );
};
