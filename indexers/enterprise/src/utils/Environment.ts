import dotenv from 'dotenv';
import { Epoch } from '@apps-shared/indexers/types';

dotenv.config();

export class Environment {
  static load() {
    dotenv.config();
  }

  static getGenesis = (): Epoch => {
    return {
      height: +process.env.GENESIS_HEIGHT,
      timestamp: +process.env.GENESIS_TIMESTAMP,
    };
  };
}
