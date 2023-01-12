import { useCallback, useMemo, useState } from 'react';
import { SearchTextInput } from 'components/search-text-input';
import { useTokens } from '@terra-money/apps/hooks';
import { Token } from '@terra-money/apps/types';
import { CW20Addr } from '@terra-money/apps/types';
import { ListItem } from './ListItem';
import { useCW20TokenInfoQuery } from 'queries';
import { VStack } from 'lib/ui/Stack';
import styled from 'styled-components';
import { Spinner } from 'lib/ui/Spinner';

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

const Container = styled(VStack)`
  height: 320px;
  overflow-y: auto;
`;

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
    const result = Object.values(tokens ?? {})
      .filter((t) => t.symbol !== undefined && isMatchingToken(t, searchText))
      .sort((a, b) => a.symbol.localeCompare(b.symbol));

    if (result.length === 0 && cw20Token) {
      result.push({
        type: 'cw20',
        key: searchText,
        token: searchText as CW20Addr,
        name: cw20Token.name,
        symbol: cw20Token.symbol,
        decimals: cw20Token.decimals,
        icon: '',
        protocol: '',
      });
    }

    return result;
  }, [cw20Token, searchText, tokens]);

  const isLoading = areTokensLoading || cw20TokenLoading;

  return (
    <VStack gap={24}>
      <SearchTextInput
        style={{ width: '100%' }}
        placeholder="Search for a token"
        searchText={searchText}
        onChange={onSearchTextChanged}
      />

      <Container gap={8}>
        {isLoading && tokenList.length < 1 ? (
          <Spinner />
        ) : (
          tokenList.map((token) => <ListItem onSelect={() => onSelect(token)} token={token} />)
        )}
      </Container>
    </VStack>
  );
};
