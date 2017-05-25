
// npm packages
import passport from 'passport';

// our packages
import {r, Chat} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/chat', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    const chat = await r.table('Chat').orderBy(r.desc('id'));
    // send question back
    res.send(chat);
  }));
};
