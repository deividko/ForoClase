import * as ActionTypes from '../actionTypes';

let nextNotificationId = 0;

export const helloWorldAction = () => ({
  type: ActionTypes.HELLO_WORLD,
});

export const initAuthAction = () => ({
  type: ActionTypes.INIT_AUTH,
});

export const loginAction = payload => ({
  type: ActionTypes.DO_LOGIN,
  payload,
});

export const githubLoginAction = payload => ({
  type: ActionTypes.DO_GITHUB_LOGIN,
  payload,
});


export const logoutAction = () => ({
  type: ActionTypes.DO_LOGOUT,
});

export const registerAction = payload => ({
  type: ActionTypes.DO_REGISTER,
  payload,
});

/**
 * Add a notification to the store.
 * @param {String} text - text to display
 * @param {String} alertType - Bootstrap alert style: success | info | warning | danger
*/
export const addNotificationAction = payload => ({
  type: ActionTypes.ADD_NOTIFICATION,
  payload: {
    id: nextNotificationId++,
    ...payload,
  },z
});

export const getNextNotificationId = () => nextNotificationId;


/**
 * Remove a notification from the store.
 * @param {String} notificationId
*/
export const removeNotificationAction = notificationId => ({
  type: ActionTypes.REMOVE_NOTIFICATION,
  payload: {notificationId},
});

export const removeNotificationByRefAction = notificationRef => ({
  type: ActionTypes.REMOVE_NOTIFICATION_BY_REF,
  payload: {notificationRef},
});

export const resetQuestions = () => ({
  type: ActionTypes.RESET_QUESTIONS,
});

export const getMoreQuestions = payload => ({
  type: ActionTypes.GET_MORE_QUESTIONS,
  payload,
});

export const addObservable = observable => ({
  type: ActionTypes.ADD_OBSERVABLE,
  payload: observable,
});

export const removeObservable = payload => ({
  type: ActionTypes.REMOVE_OBSERVABLE,
  payload,
});

export const getAnswers = questionId => ({
  type: ActionTypes.GET_ANSWERS,
  payload: {questionId},
});

export const answerQuestion = payload => ({
  type: ActionTypes.ANSWER_QUESTION,
  payload,
});

export const deleteAnswer = payload => ({
  type: ActionTypes.DELETE_ANSWER,
  payload,
});

export const startEditAnswer = payload => ({
  type: ActionTypes.START_EDIT_ANSWER,
  payload,
});

export const endEditAnswer = payload => ({
  type: ActionTypes.END_EDIT_ANSWER,
  payload,
});

export const editAnswer = payload => ({
  type: ActionTypes.EDIT_ANSWER,
  payload,
});
export const closeQuestion = payload => ({
  type: ActionTypes.CLOSE_QUESTION,
  payload,
});

export const createQuestion = payload => ({
  type: ActionTypes.CREATE_QUESTION,
  payload,
});

export const doFilterQuestions = payload => ({
  type: ActionTypes.DO_FILTER_QUESTIONS,
  payload,
});

export const orderBy = payload => ({
  type: ActionTypes.ORDER_BY,
  payload,
});

export const deleteQuestionAction = payload => ({
  type: ActionTypes.DELETE_QUESTION,
  payload,
});
