import * as actionTypes from './actionTypes';
import {
    fromJS
} from 'immutable';

// 将对象变为immutable类型的对象
const defaultState = fromJS({
    focused: false,
    mouseIn: false, // 热门搜索用
    list: [],
    page: 1,
    totalPage: 1
});

export default (state = defaultState, action) => {

    switch (action.type) {

        case actionTypes.SEARCH_FOCUS:
            // immutable对象的set方法：会结合之前immutable对象的值和设置的值，返回一个全新的对象
            return state.set('focused', true);
        case actionTypes.SEARCH_BLUR:
            return state.set('focused', false);
        case actionTypes.SEARCH_HOTLIST:
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            });
        case actionTypes.MOUSEENTER:
            return state.set('mouseIn', true);
        case actionTypes.MOUSELEAVE:
            return state.set('mouseIn', false);
        case actionTypes.CHANGEPATH:
            return state.set('page', action.page);
        default:
            return state;
    }

}