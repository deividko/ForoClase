import * as ActionTypes from '../actionTypes';

const initialState = {chat: [], status: 'initied'};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CONVERSATION:
      return {
        ...state,
        status: 'loading...',
      };
    case ActionTypes.GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        chat: action.payload.chat,
        status: 'done',
      };
    default:
      return state;
  }
};
