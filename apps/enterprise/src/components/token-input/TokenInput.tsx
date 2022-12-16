import { useCallback, useMemo, useState } from 'react';
import { Text, Throbber } from 'components/primitives';
import { Container } from '@terra-money/apps/components/container';
import { SearchTextInput } from 'components/search-text-input';
import { useTokens } from '@terra-money/apps/hooks';
import { Token, CW20Token } from '@terra-money/apps/types';
import classNames from 'classnames';
import { CW20Addr } from '@terra-money/apps/types';
import { ListData } from './ListData';
import { ListItem } from './ListItem';
import styles from './TokenList.module.sass';
import { pluralize } from '@terra-money/apps/utils';
import { useCW20TokenInfoQuery } from 'queries';
import { VStack } from 'lib/ui/Stack';

const isMatchingToken = (token: Token, searchText: string): boolean => {
  if (searchText?.length === 0) {
    return true;
  }

  const { symbol = '', name = '' } = token;

  return (
    symbol.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
    name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  );
};

interface TokenInputProps {
  onSelect: (token: Token) => void;
}

export const TokenInput = ({ onSelect }: TokenInputProps) => {
  const [searchText, setSearchText] = useState('');

  const { data: cw20Token, isLoading: cw20TokenLoading } = useCW20TokenInfoQuery(searchText as CW20Addr);

  const { tokens, isLoading: areTokensLoading } = useTokens();

  const onSearchTextChanged = useCallback(
    (text: string) => {
      setSearchText(text);
    },
    [setSearchText]
  );

  const tokenList = useMemo(() => {
    return Object.values(tokens ?? {})
      .filter((t) => t.symbol !== undefined && isMatchingToken(t, searchText))
      .sort((a, b) => a.symbol.localeCompare(b.symbol));
  }, [tokens, searchText]);

  const listData = useMemo<ListData>(() => {
    const onSelectionChanged = (token: Token) => {
      onSelect(token);
    };

    if (tokenList.length === 0 && cw20Token) {
      const token: CW20Token = {
        type: 'cw20',
        key: searchText,
        token: searchText as CW20Addr,
        name: cw20Token.name,
        symbol: cw20Token.symbol,
        decimals: cw20Token.decimals,
        icon: '',
        protocol: '',
      };
      return {
        tokens: [token],
        onSelectionChanged,
      };
    }

    return {
      tokens: tokenList,
      onSelectionChanged,
    };
  }, [cw20Token, onSelect, searchText, tokenList]);

  const isLoading = areTokensLoading || cw20TokenLoading;
  const areTokens = listData.tokens.length > 0;

  return (
    <VStack gap={24}>
      <SearchTextInput
        className={styles.searchTextInput}
        placeholder="Search for a token"
        searchText={searchText}
        onChange={onSearchTextChanged}
      />

      <Container
        className={classNames(styles.columns, {
          [styles.hide]: isLoading && !areTokens,
        })}
        direction="row"
      >
        <Text variant="text">{`Displaying ${listData.tokens.length} ${pluralize(
          'token',
          listData.tokens.length
        )}`}</Text>
        <Text variant="text">Balance</Text>
      </Container>
      {areTokens ? (
        <VStack gap={8}>
          {listData.tokens.map((token) => (
            <ListItem onSelect={() => onSelect(token)} token={token} />
          ))}
        </VStack>
      ) : isLoading ? (
        <Throbber className={styles.throbber} />
      ) : null}
    </VStack>
  );
};
