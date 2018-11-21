import * as actionTypes from './actionTypes';
import {
    fromJS
} from 'immutable';
import axios from 'axios';

const changeHotSearchList = (data) => ({
    type: actionTypes.SEARCH_HOTLIST,
    data: fromJS(data), // 为了统一reducer中list这个值也要是immutable
    totalPage: Math.ceil(data.length / 10)
});

export const searchFocus = () => ({
    type: actionTypes.SEARCH_FOCUS
});

export const searchBlur = () => ({
    type: actionTypes.SEARCH_BLUR
});

// 使用了redux-thunk 返回时不一定要是对象()  也可以是一个函数{}
export const getHotSearchList = () => {
    return (dispatch) => {
        axios.get('/api/header/hotsearchlist.json').then((res) => {
            const data = res.data;
            dispatch(changeHotSearchList(data.data));
        }).catch(() => {
            console.log('error');
        })
    }
}

export const mouseEnter = () => ({
    type: actionTypes.MOUSEENTER
});


export const mouseLeave = () => ({
    type: actionTypes.MOUSELEAVE
});

export const changePage = (page) => ({
    type: actionTypes.CHANGEPATH,
    page: page
});