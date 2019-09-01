import axios from 'axios';

import { Update } from './types';

const client = axios.create({
  timeout: 60000
});

const token = process.env.BOT_TOKEN;
const api = 'https://api.telegram.org/bot';

const getEndpointAddress = (method: string) => `${api}${token}/${method}`;

export const updatesEndpointAddress = getEndpointAddress('getUpdates');
export const sendMessageEndpointAddress = getEndpointAddress('sendMessage');

export const getUpdates = async (lastUpdateId?: number) => {
  console.log('Making request...');
  const response = await client.get(
    updatesEndpointAddress,
    {
      params: {
        offset: lastUpdateId && lastUpdateId + 1 || undefined,
        timeout: 55,
        allowed_updates: 'message'
      }
    }
  );
  if (response && response.data) {
    // console.log('Response', response.data);
    return response.data.result as ReadonlyArray<Update>;
  }
}

export const sendMessage = async (chat_id: number, text: string) => {
  console.log(`- Responding "${text.replace('\n', ' ')}" to`, chat_id);
  await client.post(sendMessageEndpointAddress, { chat_id, text, parse_mode: 'Markdown' });
}
