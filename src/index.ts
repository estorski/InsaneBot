import { getUpdates } from './endpoints';
import { processMessage } from './processors/hub';
import { saveStoreToFile, store } from './store';
import { timeout } from './utils';

const processUpdates = async () => {
  const updates = await getUpdates(store.lastUpdateId);
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
}

(async () => {
  console.log('Start long polling...');
  while (true) {
    try {
      await Promise.all([
        processUpdates(),
        timeout(1000)
      ]);
    } catch (ex) {
      console.error(ex);
    }
  }
})();
