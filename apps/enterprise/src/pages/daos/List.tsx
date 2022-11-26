import classNames from 'classnames';
import { DAOCard } from 'pages/shared/DAOCard';
import { DAO } from 'types';
import styles from './List.module.sass';

interface ListProps {
  className?: string;
  items: DAO[];
  isLoading: boolean;
}

export const List = (props: ListProps) => {
  const { className, items, isLoading } = props;

  return (
    <ul className={classNames(styles.root, className)}>
      {items.map((dao, index) => {
        return (
          <li key={index}>
            <DAOCard dao={dao} skeleton={isLoading} />
          </li>
        );
      })}
    </ul>
  );
};
