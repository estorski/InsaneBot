import { getUpdates } from './endpoints';
import { processMessage } from './processors/hub';
import { saveStoreToFile, store } from './store';
import { timeout } from './utils';

(async () => {
  console.log('Start long polling...');
  while (true) {
    try {
      const [updates] = await Promise.all([
        getUpdates(store.lastUpdateId),
        timeout(1000)
      ]);
      for (const update of updates) {
        const { message, update_id } = update;
        if (update_id) {
          store.lastUpdateId = update_id;
          saveStoreToFile();
        }

        if (message) {
          processMessage(message);
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  }
})();
