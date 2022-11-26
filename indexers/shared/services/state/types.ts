export interface State {
  set<Value>(state: Value): Promise<void>;
  get<Value>(defaultValue?: Value): Promise<Value>;
}
