import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import { sessionsReducer, usersReducer } from './session';
import logger from 'redux-logger';

const rootReducer = combineReducers({
    users: usersReducer,
    session: sessionsReducer
  })

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  // const logger = require('redux-logger').default
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  enhancer = applyMiddleware(thunk, logger);
}

const configureStore = (preloadedState = {}) => (
  createStore(rootReducer, preloadedState, enhancer)
  // createStore(rootReducer, preloadedState, applyMiddleware(thunk))
)

export default configureStore;