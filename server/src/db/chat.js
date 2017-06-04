import {thinky} from './thinky';

export const Chat = thinky.createModel('Chat', {
  title: thinky.type.string().required(),
  messages: thinky.type.array().schema(thinky.type.object().schema(
    {
      id: thinky.type.string(),
      user: thinky.type.string(),
      date: thinky.type.date().default(thinky.r.now()),
      text: thinky.type.string(),
    }
  ).default([])),
  users: thinky.type.array().schema(thinky.type.object().schema(
    {      
      id: thinky.type.string(),
    }
  ).default([])),
  ownerId: thinky.type.string().required(),
  ownerName: thinky.type.string().required(),
});
