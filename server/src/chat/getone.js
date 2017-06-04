import passport from 'passport';

// our packages
import {Chat} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/chat/:id', asyncRequest(async (req, res) => {
    try {
      const chat = await Chat.get(req.params.id)
        .execute();
      res.send(chat);
    } catch (e) {
      res.status(400).send({error: 'Chat does not exist'});
    }
  }));
};
