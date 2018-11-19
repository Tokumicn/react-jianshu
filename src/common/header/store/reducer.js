import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

// 将对象变为immutable类型的对象
const defaultState = fromJS({
    focused: false
});

export default (state = defaultState, action) => {
    // immutable对象的set方法：会结合之前immutable对象的值和设置的值，返回一个全新的对象
    if(action.type === actionTypes.SEARCH_FOCUS){
        return state.set('focused', true)
    }

    if(action.type === actionTypes.SEARCH_BLUR){
        return state.set('focused', false)
    }
    return state;
}