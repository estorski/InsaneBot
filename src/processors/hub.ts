import { sendMessage } from '../endpoints';
import { Message } from '../types';

import { process as processCarNextSanityCheck } from './CarNextSanityCheck';
import { process as processHelp } from './Help';

const processUnknown = (message: Message) => {
  sendMessage(message.chat.id, [
    `Unknown command: \`${message.text}\``,
    'Type in \`/help\` for the list of possible commands'
  ].join('\n'));
  return true;
}

const processors = [
  processHelp,
  processCarNextSanityCheck,
  processUnknown
];

export const processMessage = (message: Message) => {
  for (const processor of processors) {
    if (processor(message)) break;
  }
}
