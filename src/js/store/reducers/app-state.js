import {ActionType} from '../action';
import {extend} from '../../utils';
import {SORT_TYPE} from '../../const';

const initialState = {
  activeSort: SORT_TYPE.ASCENDING_PRICE.value,
  selectedSegments: [],
  selectedAirlines: [],
  selectedMinPrice: "",
  selectedMaxPrice: "",

};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SORTING:
      return extend(state, {
        activeSort: action.payload,
      });
    case ActionType.ADD_AIRLINER_OF_FILTER:
      return extend(state, {
        selectedAirlines: [...state.selectedAirlines, action.payload],
      });
    case ActionType.REMOVE_AIRLINER_OF_FILTER:
      const indexAirline = state.selectedAirlines.indexOf(action.payload)
      return extend(state, {
        selectedAirlines: [...state.selectedAirlines.slice(0, indexAirline), ...state.selectedAirlines.slice(indexAirline+1)]
      });
    case ActionType.ADD_SEGMENT_OF_FILTER:
      return extend(state, {
        selectedSegments: [...state.selectedSegments, action.payload]
      });
    case ActionType.REMOVE_SEGMENT_OF_FILTER:
      const indexSegment = state.selectedSegments.indexOf(action.payload)
      return extend(state, {
        selectedSegments: [...state.selectedSegments.slice(0, indexSegment), ...state.selectedSegments.slice(indexSegment+1)]
      });
    case ActionType.CHANGE_MIN_PRICE:
      return extend(state, {
        selectedMinPrice : action.payload,
      });
    case ActionType.CHANGE_MAX_PRICE:
      return extend(state, {
        selectedMaxPrice : action.payload,
      });
  }

  return state;
};


export {appState};
