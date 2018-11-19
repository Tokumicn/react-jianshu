import { combineReducers } from 'redux-immutable';
import {reducer as headerReducer} from '../common/header/store';

// 合并Reducer
const reducer =  combineReducers({
    header: headerReducer
})

export default reducer;