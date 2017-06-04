import * as ActionTypes from '../actionTypes';

const initialState = {chats: []};

export const chats = (state = initialState, action) => {
  switch (action.type) {
    // all chats logic
    case ActionTypes.GET_ALL_CHATS: {
      return {
       chats: [],
      }
    }
    case ActionTypes.GET_ALL_CHATS_SUCCESS: {
      return {
       chats: action.payload.chats,
      }
    }
    case ActionTypes.CREATE_CHAT_SUCCESS: {
      const newChats = [action.payload, ...state.chats];
      return {...state, chats: newChats};
    }
   case ActionTypes.JOIN_CHAT_SUCCESS: {
     return {
       ...state,
       chat: action.payload.chat,
     }
   }
   case ActionTypes.DELETE_CHAT: {
     const newChats = state.chats.filter(chat => chat.id !== action.payload.chat.id);
     return {...state, chats: newChats};
   }
   case ActionTypes.GET_FOLLOWERS_SUCCESS: {
     return {
       ...state,
      follower: action.payload.follower,}
   }
    default:
      return state;
  }
};
