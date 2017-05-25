import {Observable} from 'rxjs/Observable';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, ajaxErrorToMessage} from '../../util';
import {server as serverConfig} from '../../../config';

const host = serverConfig.host;
const port = serverConfig.port;

export const getConversationChat = action$ => action$
  .ofType(ActionTypes.GET_CONVERSATION)
  .map(signRequest)
  .mergeMap(({headers}) => Observable
  .ajax.get(`http://${host}:${port}/api/chat`, headers)
  .map(res => res.response)
  .map(chat => ({
    type: ActionTypes.GET_CONVERSATION_SUCCESS,
    payload: {chat},
  }))
  .catch(error => Observable.of(
    {
      type: ActionTypes.GET_CONVERSATION_ERROR,
      payload: {error},
    },
    Actions.addNotificationAction(
      {text: `[Getting conversation] Error: ${ajaxErrorToMessage(error)}`, alerType: 'danger'},
    ),
  )),
);

export const sendText = action$ => action$
  .ofType(ActionTypes.SEND_TEXT)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
  .ajax.post(`http://${host}:${port}/api/chat`, payload, headers)
  .map(res => res.response)
  .map(conversation => ({
    type: ActionTypes.SEND_TEXT_SUCCESS,
    payload: conversation,
  }))
  .catch(error => Observable.of(
    {
      type: ActionTypes.SEND_TEXT_ERROR,
      payload: {error},
    },
    Actions.addNotificationAction(
      {text: `[Getting conversation] Error: ${ajaxErrorToMessage(error)}`, alerType: 'danger'},
    ),
  )),
);
