// npm packages
import passport from 'passport';

// our packages
import {r, Chat} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/chat/join/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    try {
      let exist = false;
      const chat = await Chat.get(req.params.id);

      for (let i = 0; i < chat.users.length; i++) {
        if (chat.users[i].id == req.user.id) {
            exist = true;
        }
      }

      if(req.user.id === chat.ownerId){
        res.status(403).send({error: 'You own this Chat!'});
        return;
    }



      if (exist) {
        res.status(409).send({error: 'Only can join one time this chat'});
        return;
      }

      chat.users.push({id: req.user.id, name: req.user.login});

      await chat.save();
      res.send(chat);

    } catch (e) {
      res.status(400).send({error: 'Cannot be joined'});
    }
  }));
}
