import { fromJS } from 'immutable';
import * as constants from './actionTypes';

const defaultState = fromJS({
	title: '',
	content: ''
});

export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.CHANGE_DETAIL:
			console.log(action.title);
			return state.merge({
				title: action.title,
				content: action.content
			})
		default:
			return state;
	}
}