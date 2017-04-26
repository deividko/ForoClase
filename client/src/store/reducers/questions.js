import * as ActionTypes from '../actionTypes';

const initialState = {questions: [], status: 'inited', answering: {}, hasMore: true};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.RESET_QUESTIONS:
      return {questions: [], status: 'loading', hasMore: true, error: null};
    case ActionTypes.GET_MORE_QUESTIONS:
      return {...state, status: 'loading', error: null};
    case ActionTypes.GET_MORE_QUESTIONS_SUCCESS: {
      const hasMore = action.payload.questions.length === 10;
      return {
        ...state,
        questions: action.payload.reset ? action.payload.questions : state.questions.concat(action.payload.questions),
        status: 'done',
        filtered: action.payload.filtered,
        hasMore,
      };
    }
    case ActionTypes.GET_ANSWERS_ERROR:
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.EDIT_ANSWER_ERROR:
    case ActionTypes.DELETE_ANSWER_ERROR:
    case ActionTypes.CREATE_QUESTION_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    case ActionTypes.GET_ANSWERS_SUCCESS:
    case ActionTypes.ANSWER_QUESTION_SUCCESS:
    case ActionTypes.EDIT_ANSWER_SUCCESS:
    case ActionTypes.DELETE_ANSWER_SUCCESS: {
      const newQuestions = state.questions.map(q => q.id === action.payload.question.id ? action.payload.question : q);
      return {
        ...state,
        questions: newQuestions,
        status: 'done',
        answering: action.type === ActionTypes.ANSWER_QUESTION_SUCCESS ? {
          ...state.answering,
          [action.payload.question.id]: false,
        } : state.answering,
        deleting: action.type === ActionTypes.DELETE_ANSWER_SUCCESS ? {
          ...state.deleting,
          [action.payload.answerId]: false,
        } : state.deleting,
        updating: action.type === ActionTypes.EDIT_ANSWER_SUCCESS ? {
          ...state.updating,
          [action.payload.answer.id]: false,
        } : state.updating,
        hasMore: state.hasMore,
      };
    }
    case ActionTypes.START_EDIT_ANSWER: return {...state, editing: action.payload.answerId};
    case ActionTypes.END_EDIT_ANSWER: return {...state, editing: false};
    case ActionTypes.ANSWER_QUESTION: {
      const answering = {...state.answering, [action.payload.question.id]: true};
      return {...state, answering, editing: false};
    }
    case ActionTypes.DELETE_ANSWER: {
      const deleting = {...state.deleting, [action.payload.answerId]: true};
      return {...state, deleting, editing: false};
    }
    case ActionTypes.EDIT_ANSWER: {
      const updating = {...state.updating, [action.payload.answer.id]: true};
      return {...state, updating, editing: false};
    }
    case ActionTypes.CREATE_QUESTION_SUCCESS: {
      const newQuestions = [action.payload, ...state.questions];
      return {...state, questions: newQuestions, status: 'done', hasMore: state.hasMore};
    }
    case ActionTypes.ADD_NOTIFICATION:
    case ActionTypes.REMOVE_NOTIFICATION:
    case ActionTypes.REMOVE_NOTIFICATION_BY_REF: {
      return state;
    }
    default:
      return {...state, editing: false};
  }
};
