import {thinky} from './thinky';

export const room = thinky.createModel('Room', {
  sala: thinky.type.string().required(),
  answers: thinky.type.array().schema(
    thinky.type.object().schema({
      id: thinky.type.string().required(),
      user: thinky.type.string().required(),
      answer: thinky.type.string().required(),
    })
  ).default([])
});
