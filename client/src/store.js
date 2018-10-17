import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

/**
 * store will be the place where all of your application state lives.
 * the rootReducer combines all of the reducers in the app
 * the initial state will be an empty object, because that state tree is an object
 * we use 'thunk' as our middleware.
 * compose allows us to use the redux chrome extention.
 */
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )
);

export default store;