import {initAuth, login, githubLogin, register, logout} from './auth';
import {addNotification} from './notifications';
import {addObservable, openConnection, closeConnection} from './realtime';
import {helloWorld} from './helloworld';
import {createChat, getAllChats, joinChat, deleteChat, getFollowers, getOneChat, sendMessage} from './chat';
import {getMoreQuestions,
        answerQuestion,
        deleteAnswer,
        editAnswer,
        createQuestion,
        getAnswers,
        doFilterQuestions,
        removePendingQuestionNotifications,
        lockQuestion,
        orderBy,
        deleteQuestion,
        voteQuestion} from './questions';

export default [
  // auth
  initAuth,
  login,
  githubLogin,
  register,
  logout,
  addNotification,
  addObservable,
  openConnection,
  closeConnection,
  // hello world
  helloWorld,
  // questions
  getMoreQuestions,
  doFilterQuestions,
  answerQuestion,
  deleteAnswer,
  editAnswer,
  createQuestion,
  getAnswers,
  removePendingQuestionNotifications,
  lockQuestion,
  orderBy,
  deleteQuestion,
  voteQuestion,
  // Chat
  createChat,
  getAllChats,
  joinChat,
  deleteChat,
  getFollowers,
  getOneChat,
  sendMessage,
];
