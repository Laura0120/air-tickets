const ActionType = {
  LOAD_SORTED_FLIGHTS: `LOAD_SORTED_FLIGHTS`,
  LOAD_FILTERED_FLIGHTS: 'LOAD_FILTERED_FLIGHTS',
  LOAD_NEXT_FLIGHTS: `LOAD_NEXT_FLIGHTS`,
  LOAD_INITIAL_FILTERS: `LOAD_INITIAL_FILTERS`,
  LOAD_ACTIVE_AIRLINERS: `LOAD_ACTIVE_AIRLINERS`,
  LOAD_ACTIVE_SEGMENTS: `LOAD_ACTIVE_SEGMENTS`,
  LOAD_ACTIVE_MIN_PRICE: 'LOAD_ACTIVE_MIN_PRICE',
  LOAD_ACTIVE_MAX_PRICE: 'LOAD_ACTIVE_MAX_PRICE',
  ADD_AIRLINER_OF_FILTER: 'ADD_AIRLINER_OF_FILTER',
  REMOVE_AIRLINER_OF_FILTER: 'REMOVE_AIRLINER_OF_FILTER',
  ADD_SEGMENT_OF_FILTER: 'ADD_SEGMENT_OF_FILTER',
  REMOVE_SEGMENT_OF_FILTER: 'REMOVE_SEGMENT_OF_FILTER',
  CHANGE_SORTING: 'CHANGE_SORTING',
  CHANGE_MIN_PRICE:'CHANGE_MIN_PRICE',
  CHANGE_MAX_PRICE:'CHANGE_MAX_PRICE',
  CHANGE_IS_SHOW_MORE: 'CHANGE_IS_SHOW_MORE'
};

const ActionCreator = {
  loadSortedFlights: (flights) => ({
    type: ActionType.LOAD_SORTED_FLIGHTS,
    payload: flights,
  }),
  loadFilteredFlights: (flights) => ({
    type: ActionType.LOAD_FILTERED_FLIGHTS,
    payload: flights,
  }),
  loadNextFlights: (flights) => ({
    type: ActionType.LOAD_NEXT_FLIGHTS,
    payload: flights,
  }),
  loadIsShowMore: (flights) => ({
    type: ActionType.CHANGE_IS_SHOW_MORE,
    payload: flights,
  }),
  loadInitialFilters: (filters) => ({
    type: ActionType.LOAD_INITIAL_FILTERS,
    payload: filters,
  }),
  loadActiveSegments: (segments) => ({
    type: ActionType.LOAD_ACTIVE_SEGMENTS,
    payload: segments,
  }),
  loadActiveAirliners: (airliners) => ({
    type: ActionType.LOAD_ACTIVE_AIRLINERS,
    payload: airliners,
  }),
  loadActiveMinPrice: (price) => ({
    type: ActionType.LOAD_ACTIVE_MIN_PRICE,
    payload: price,
  }),
  loadActiveMaxPrice: (price) => ({
    type: ActionType.LOAD_ACTIVE_MAX_PRICE,
    payload: price,
  }),
  changeSorting: (activeSort) => ({
    type: ActionType.CHANGE_SORTING,
    payload: activeSort,
  }),
  addAirlineToFilter: (filter) => ({
    type: ActionType.ADD_AIRLINER_OF_FILTER,
    payload: filter,
  }),
  removeAirlineFromFilter: (filter) => ({
    type: ActionType.REMOVE_AIRLINER_OF_FILTER,
    payload: filter,
  }),
  addSegmentToFilter: (filter) => ({
    type: ActionType.ADD_SEGMENT_OF_FILTER,
    payload: filter,
  }),
  removeSegmentFromFilter: (filter) => ({
    type: ActionType.REMOVE_SEGMENT_OF_FILTER,
    payload: filter,
  }),
  changeMinPrice: (value) => ({
    type: ActionType.CHANGE_MIN_PRICE,
    payload: value,
  }),
  changeMaxPrice: (value) => ({
    type: ActionType.CHANGE_MAX_PRICE,
    payload: value,
  }),

};

export {ActionType, ActionCreator};
