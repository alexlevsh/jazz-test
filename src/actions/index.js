export const actions = {
  AUTH: 'AUTH',
  SEARCH_FILES: 'SEARCH_FILES',
  APPEND_FILES: 'APPEND_FILES',
  LOADING: 'LOADING',
  IS_AUTH: 'IS_AUTH',
  LIKE_PHOTO: 'LIKE_PHOTO',
  DISLIKE_PHOTO: 'DISLIKE_PHOTO',
  APPEND_LIKES: 'APPEND_LIKES',
};

export const authUser = () => ({ type: actions.AUTH });
export const searchFiles = (query) => ({ type: actions.SEARCH_FILES, payload: query });
export const appendFiles = (files) => ({ type: actions.APPEND_FILES, payload: files });
export const appendLikes = (likes) => ({ type: actions.APPEND_LIKES, payload: likes });
export const loading = (bol) => ({ type: actions.LOADING, payload: bol });
export const isAuth = (auth) => ({ type: actions.IS_AUTH, payload: auth });
export const likePhoto = (id) => ({ type: actions.LIKE_PHOTO, payload: id });
export const disLikePhoto = (id) => ({ type: actions.DISLIKE_PHOTO, payload: id });
