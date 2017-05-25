import passport from 'passport';

import {Chat} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/chat', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {

    const {conversation} = req.body;

    // make sure text is not empty
    if (!conversation) {
      res.status(400).send({error: 'Text should be present!'});
      return;
    }

    // save new question
    const chat = new Chat({
      conversation,
    });
    await chat.save();

    // send created question back
    res.send(chat);
  }));
};
