import { actions } from '../actions';

const defaultState = {
  files: {},
  loading: false,
  auth: false,
  likes: [],
};

export default function root(state = defaultState, action) {
  switch (action.type) {
    case actions.APPEND_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case actions.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.IS_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case actions.APPEND_LIKES:
      return {
        ...state,
        likes: action.payload,
      };
    case actions.LIKE_PHOTO:
      return {
        ...state,
        likes: [...state.likes, action.payload],
      };
    case actions.DISLIKE_PHOTO:
      return {
        ...state,
        likes: state.likes.filter((like) => like !== action.payload),
      };
    default:
      return state;
  }
}
