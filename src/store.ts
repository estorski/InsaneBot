import * as fs from 'fs';
import { Store } from './types';

const storeFileName = 'store.json';
const restoreStoreFromFile = () => {
  try {
    const data = fs.existsSync(storeFileName) && fs.readFileSync(storeFileName);
    if (data) {
      return JSON.parse(data.toString()) as Store;
    }
  } catch (ex) {
    console.log(ex);
  }
}

export const store = restoreStoreFromFile() || {};

export const saveStoreToFile = () => {
  fs.writeFileSync(storeFileName, JSON.stringify(store));
};
