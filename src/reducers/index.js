import { combineReducers } from "redux";

import { cardsReducer } from "./cards.reducers.js";

const rootReducer = combineReducers({
  cardsReducer
});

export default rootReducer;
