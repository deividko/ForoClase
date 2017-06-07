// npm packages
import passport from 'passport';
import uuidV1 from 'uuid/v1';

// our packages
import {Chat} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/chat/:id/message', passport.authenticate('jwt', {session: false}),
  asyncRequest(async (req, res) => {
    const {id} = req.params;
    // get user input
    const {message} = req.body;

    // make sure text is not empty
    if (message !== undefined && !message.length) {
      res.status(400).send({error: 'Message should be not empty!'});
      return;
    }

    // get the question
    const chat = await Chat.get(id);

    // double-check check if question exists
    if (!chat) {
      res.status(400).send({error: 'Chat not found!'});
      return;
    }

    // append new answer
    chat.messages.push({id: uuidV1(), message, user: req.user.login});

    // try saving
    await chat.save();

    // send created question back
    res.send(chat);
  }));

}
