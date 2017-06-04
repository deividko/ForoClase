// npm packages
import passport from 'passport';

// our packages
import {Chat} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/chat/createchat', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    // get chat input
    const {title} = req.body;

    // make sure title is not empty
    if (!title || !title.length) {
      res.status(400).send({error: 'The chat must have a title!'});
      return;
    }

    // create chat
    const chat = new Chat({
      title,
      ownerId: req.user.id,
      ownerName: req.user.login,
      messages: [],
      users: [],
    });

    // save chat
    await chat.save();
    try {
        // send chat back
      res.send(chat);
    } catch (e) {
      res.stats(400).send({error: e.toString()});
    }
    res.sendStatus(201);
  }));
};
