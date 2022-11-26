import classNames from 'classnames';
import styles from './Skeleton.module.sass';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = (props: SkeletonProps) => {
  const { className } = props;

  return <div className={classNames(className, styles.root)} />;
};
