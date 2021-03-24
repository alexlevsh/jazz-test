import { call, takeEvery, put } from 'redux-saga/effects';
import {
  actions, appendFiles, loading, isAuth, appendLikes,
} from '../actions';
import {
  auth, search, likePhoto, dislikePhoto,
} from '../api/user';
import convertToLikeList from '../utils';

export function* authSaga() {
  try {
    const token = localStorage.getItem('token');
    const url = new URL(window.location);
    const code = url.search.replaceAll('?code=', '');
    if (token) {
      yield put(isAuth(true));
    }
    if (url.search.includes('code')) {
      if (!token) {
        const { data } = yield call(auth, code);
        localStorage.setItem('token', data.access_token);
        yield put(isAuth(true));
      }
    }
  } catch (e) {
    localStorage.removeItem('token');
    console.log(e);
  }
}

export function* searchFilesSaga({ payload }) {
  try {
    yield put(loading(true));
    const { data } = yield call(search, payload);
    yield put(appendFiles(data));
    yield put(appendLikes(convertToLikeList(data.results)));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loading(false));
  }
}

export function* likePhotoSaga({ payload }) {
  try {
    yield call(likePhoto, payload);
  } catch (e) {
    console.log(e);
  }
}

export function* dislikePhotoSaga({ payload }) {
  try {
    yield call(dislikePhoto, payload);
  } catch (e) {
    console.log(e);
  }
}

export default [
  takeEvery(actions.AUTH, authSaga),
  takeEvery(actions.SEARCH_FILES, searchFilesSaga),
  takeEvery(actions.LIKE_PHOTO, likePhotoSaga),
  takeEvery(actions.DISLIKE_PHOTO, dislikePhotoSaga),
];
