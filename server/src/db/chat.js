import {thinky} from './thinky';

export const Chat = thinky.createModel('Chat', {
  conversation: thinky.type.array().required(),
});
