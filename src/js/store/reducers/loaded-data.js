import {ActionType} from '../action';
import {extend} from '../../utils';

const initialState = {
  flights: [],
  initialFilters: {
    segments: [],
    airlines: []
  },
  activeSegments: [],
  activeAirlines: [],
  activeMinPrice: '',
  activeMaxPrice: '',
  isShowMore: null,
};

const loadedData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILTERED_FLIGHTS:
      return extend(state, {
        flights : action.payload,
      });
    case ActionType.LOAD_NEXT_FLIGHTS:
      return extend(state, {
        flights : [...state.flights, ...action.payload],
      });
    case ActionType.LOAD_INITIAL_FILTERS:
      return extend(state, {
        initialFilters : action.payload,
      });
    case ActionType.LOAD_ACTIVE_SEGMENTS:
      return extend(state, {
        activeSegments : action.payload,
      });
    case ActionType.LOAD_ACTIVE_AIRLINERS:
      return extend(state, {
        activeAirlines : action.payload,
      });
    case ActionType.LOAD_ACTIVE_MIN_PRICE:
      return extend(state, {
        activeMinPrice : action.payload,
      });
    case ActionType.LOAD_ACTIVE_MAX_PRICE:
      return extend(state, {
        activeMaxPrice : action.payload,
      });
    case ActionType.CHANGE_IS_SHOW_MORE:
      return extend(state, {
        isShowMore : action.payload,
      });
  }

  return state;
};


export {loadedData};
