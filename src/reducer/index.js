import {combineReducers} from 'redux';
import {reducer as webApp} from './web-app/web-app.js';
import {reducer as data} from './data/data';
import {reducer as user} from './user/user';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.WEB_APP]: webApp,
  [NameSpace.USER]: user,
});
