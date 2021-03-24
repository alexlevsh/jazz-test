import { call } from 'redux-saga/effects';
import axios from 'axios';

export function* auth(code) {
  return yield call(axios.post,
    `https://unsplash.com/oauth/token?client_id=${process.env.REACT_APP_ACCESS}&client_secret=${process.env.REACT_APP_SECRET}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&code=${code}&grant_type=authorization_code`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
}

export function* search(file) {
  return yield call(axios.get,
    `https://api.unsplash.com/search/photos?page=${file.page}&query=${file.query}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
}

export function* likePhoto(id) {
  return yield call(axios.post,
    `https://api.unsplash.com/photos/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
}

export function* dislikePhoto(id) {
  return yield call(axios.delete,
    `https://api.unsplash.com/photos/${id}/like`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
}
