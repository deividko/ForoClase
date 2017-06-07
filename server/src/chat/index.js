// our packages
import create from './create';
import deleteChat from './delete';
import get from './get';
import getone from './getone';
import join from './join';
import sendMessage from './message';

export default (app) => {
  create(app);
  deleteChat(app);
  get(app);
  getone(app);
  join(app);
  sendMessage(app);
};
