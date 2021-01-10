import { createStore, combineReducers } from "redux";
import moviesInfo from "./moviesInfo/reducer";

const reducers = combineReducers({
  moviesInfo,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
