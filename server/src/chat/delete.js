// npm packages
import passport from 'passport';

// our packages
import {Chat} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.delete('/api/chat/delete/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    // get requested chat
    const chat = await Chat.get(req.params.id);

    // check if user is the owner
    if (req.user.id !== chat.ownerId) {
      res.status(403).send({error: 'Not enough rights to delete the chat!'});
      return;
    }

    // delete
    await chat.delete();

    // send success status
    res.sendStatus(204);
  }));
};
