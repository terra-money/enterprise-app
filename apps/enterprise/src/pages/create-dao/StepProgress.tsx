import styles from './StepProgress.module.sass';

interface StepProgressProps {
  percentageComplete: number;
}

export const StepProgress = (props: StepProgressProps) => {
  const { percentageComplete } = props;
  return (
    <div className={styles.root}>
      <div className={styles.bar} style={{ width: `${percentageComplete}%` }} />
    </div>
  );
};
