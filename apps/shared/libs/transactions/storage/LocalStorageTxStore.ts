import { Transaction } from "..";
import { TxStore } from "./TxStore";

class LocalStorageTxStore implements TxStore {
  private readonly _key: string;

  constructor(key: string) {
    this._key = key;
  }

  read(): Transaction[] {
    try {
      const item = window.localStorage.getItem(this._key);
      return this.parseJSON(item) ?? [];
    } catch (error) {
      console.warn(`Error reading localStorage key "${this._key}":`, error);
      return [];
    }
  }

  write(transactions: Transaction[]) {
    try {
      window.localStorage.setItem(this._key, JSON.stringify(transactions));

      // // dispatch a custom event so other tabs can be updated
      // window.dispatchEvent(new Event("local-storage-tx-store"));
    } catch (error) {
      console.warn(`Error setting localStorage key "${this._key}":`, error);
    }
  }

  private parseJSON = (value: string | null): Transaction[] | undefined => {
    try {
      return value === "undefined" ? undefined : JSON.parse(value ?? "");
    } catch {
      return undefined;
    }
  };
}

export { LocalStorageTxStore };
