// our packages
import post from './post';
import get from './get';

export default (app) => {
  post(app);
  get(app);
};
