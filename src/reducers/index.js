import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from './reducer';
import rootSaga from '../sagas/rootSaga';

const rootReducer = combineReducers({
  root: reducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    sagaMiddleware,
    createLogger(),
  ),
));

sagaMiddleware.run(rootSaga);
export default store;
