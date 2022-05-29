import {combineReducers} from "redux";
import {loadedData} from "./loaded-data";
import {appState} from "./app-state";

export const NameSpace = {
  DATA: `DATA`,
  APP_STATE: `APP_STATE`,
};

export default combineReducers({
  [NameSpace.DATA]: loadedData,
  [NameSpace.APP_STATE]: appState,
});
