import { InputAdornment } from '@mui/material';
import { TextInput } from 'components/primitives';
import classNames from 'classnames';
import { UIElementProps } from '@terra-money/apps/components';
import { ReactComponent as SearchIcon } from 'components/assets/Search.svg';
import { ReactComponent as CloseIcon } from 'components/assets/Close.svg';
import { Action } from 'types';
import styles from './SearchInput.module.sass';

type SearchInputProps = UIElementProps & {
  value?: string;
  onChange?: Action<string>;
  onClear?: Action<void>;
  onSearch?: Action<void>;
};

const SearchInput = (props: SearchInputProps) => {
  const { className, onChange, onClear, onSearch, value } = props;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onSearch && onSearch();
      }}
      style={{ width: '100%' }}
    >
      <TextInput
        className={classNames(className, styles.root)}
        placeholder="Search..."
        value={value}
        onChange={(event) => onChange && onChange(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            {value?.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon
                className={styles.close}
                onClick={() => {
                  onClear && onClear();
                }}
              />
            )}
          </InputAdornment>
        }
      />
    </form>
  );
};

export { SearchInput };
