// npm packages
import passport from 'passport';

// our packages
import {r} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/chat', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    const chats = await r.table('Chat')
      .pluck('title', 'messages', 'id', 'users', 'ownerId', 'ownerName')
    // send chat back
    res.send(chats);
  }));
  app.get('/api/chat/followed/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
      const chat = await r.table('Chat')
      .filter(r.row('users').contains(user => (user('id').match(req.user.id))))
      .pluck('id')
      res.send(chat);
  }));
};
