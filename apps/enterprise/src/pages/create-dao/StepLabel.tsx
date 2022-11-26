import classNames from 'classnames';
import { Text } from 'components/primitives';
import { WizardState } from './Wizard';
import { enterprise } from 'types/contracts';
import styles from './StepLabel.module.sass';

interface StepLabelProps<T> extends Pick<WizardState<T>, 'steps'> {
  className?: string;
  type?: enterprise.DaoType;
  description?: string;
}

export function StepLabel<T>(props: StepLabelProps<T>) {
  const { className, steps, type, description } = props;

  const typeDescription =
    type === undefined
      ? undefined
      : type === 'multisig'
      ? 'Multisig DAO'
      : type === 'nft'
      ? 'NFT Community DAO'
      : 'Community Token DAO';

  const subTitle = description !== undefined ? description : typeDescription;

  return (
    <div className={classNames(className, styles.root)}>
      <Text variant="label">{`Step ${steps.length}`}</Text>
      {subTitle && (
        <>
          <div className={styles.separator} />
          <Text
            className={classNames(styles.description, {
              [styles.highlight]: description,
            })}
            variant="label"
          >
            {subTitle}
          </Text>
        </>
      )}
    </div>
  );
}
