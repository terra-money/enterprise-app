import { ReactComponent as SearchIcon } from 'components/assets/Search.svg';
import { TextInput } from 'components/primitives/text-input';
import { InputAdornment } from '@mui/material';
import { UIElementProps } from '@terra-money/apps/components';
import classNames from 'classnames';
import styles from './SearchTextInput.module.sass';

type SearchTextInputProps = UIElementProps & {
  onChange: (searchText: string) => void;
  searchText: string;
  placeholder?: string;
};

export const SearchTextInput = (props: SearchTextInputProps) => {
  const { searchText, onChange, className, placeholder } = props;

  return (
    <TextInput
      className={classNames(styles.root, className)}
      placeholder={placeholder ?? 'Search'}
      value={searchText}
      onChange={(value) => {
        onChange(value.target.value);
      }}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon className={styles.icon} />
        </InputAdornment>
      }
    />
  );
};
