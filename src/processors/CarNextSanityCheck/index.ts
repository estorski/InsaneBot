import { sendMessage } from '../../endpoints';
import { Message } from '../../types';

export const process = (message: Message) => {
  if (message.text === '/carnext sanity check please') return true;
  return false;
}
