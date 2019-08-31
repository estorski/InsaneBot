import { sendMessage } from '../../endpoints';
import { Message } from '../../types';

export const process = (message: Message) => {
  if (message.text === '/help') {
    sendMessage(message.chat.id, [
      '\`/help\` - this message',
      '\`/carnext sanity check please\` - checks if all the CarNext homepages return 200'
    ].join('\n'));
    return true;
  }
}
