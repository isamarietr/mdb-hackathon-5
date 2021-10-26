import { createStore, applyMiddleware } from "redux";
// import rootReducer from "./reducers";
import defaultReducer from "./reducers/defaultReducer"
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(defaultReducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));
