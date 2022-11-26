import { Token } from 'types';

export interface ListData {
  tokens: Token[];
  onSelectionChanged: (token: Token) => void;
}
