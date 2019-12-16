import {combineReducers} from 'redux';
import {reducer as data} from './data/reducer';
import {reducer as user} from './user/reducer';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
