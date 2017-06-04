import {Observable} from 'rxjs/Observable';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, ajaxErrorToMessage} from '../../util';
import {server as serverConfig} from '../../../config';

const host = serverConfig.host;
const port = serverConfig.port;

export const createChat = action$ => action$
  .ofType(ActionTypes.CREATE_CHAT)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/chat/createchat`, payload, headers)
    .map(res => res.response)
    .mergeMap(chat => Observable.of(
      {
        type: ActionTypes.CREATE_CHAT_SUCCESS,
        payload: chat,
      },
      Actions.addNotificationAction(
        {text: `Chat with title "${chat.title}" created`, alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.CREATE_CHAT_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[chat create] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const getAllChats = action$ => action$
  .ofType(ActionTypes.GET_ALL_CHATS)
  .map(signRequest)
  .switchMap(({headers}) => Observable
    .ajax.get(`http://${host}:${port}/api/chat`, headers)
    .map(res => res.response)
    .map(chats => ({
      type: ActionTypes.GET_ALL_CHATS_SUCCESS,
      payload: {chats},
    }))
    .catch(error => Observable.of({
      type: ActionTypes.GET_ALL_CHATS_ERROR,
      payload: {error},
    })),
  );

export const joinChat = action$ => action$
  .ofType(ActionTypes.JOIN_CHAT)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/chat/join/${payload.chat.id}`, payload, headers)
    .map(res => res.response)
    .mergeMap(chat => Observable.of(
      {
        type: ActionTypes.JOIN_CHAT_SUCCESS,
        payload: {chat},
      },
      Actions.addNotificationAction(
        {text: `You have joined to Chat with title "${chat.title}"`, alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.JOIN_CHAT_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[chat create] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );
  
export const deleteChat = action$ => action$
  .ofType(ActionTypes.DELETE_CHAT)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.delete(`http://${host}:${port}/api/chat/delete/${payload.chat.id}`, headers)
    .map(res => res.response)
    .mergeMap(chatDeleted => Observable.of({
      type: ActionTypes.DELETE_CHAT_SUCCESS,
      payload: {chatDeleted},
    },
    Actions.addNotificationAction(
        {text: `Chat: "${payload.chat.title}" deleted`, alertType: 'info'}),
    ))
    .catch(error => Observable.of({
      type: ActionTypes.DELETE_CHAT_ERROR,
      payload: {error},
    },
    Actions.addNotificationAction(
      {text: `[chat deleted] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
    ),
  )),
);
