import {COUNT_FLIGHTS_PER_STEP} from "../const";
import {
  aLLFlights,
  sortFlight,
  filterFlights,
  collectActiveFiltersByAirlines,
  collectActiveFiltersBySegments,
  collectInitialFilters,
  collectActivePrice
} from "./utils";

export const initialFilters = collectInitialFilters(aLLFlights);
export  let validFlights  = [...aLLFlights];

export const getSortedFlights = (activeSort) => {
    validFlights = sortFlight({validFlights, activeSort})
    return Promise.resolve(validFlights.slice(0, COUNT_FLIGHTS_PER_STEP));
}

export const getNextFlights = (currentAmount) => {
  return Promise.resolve(validFlights.slice(currentAmount, currentAmount + COUNT_FLIGHTS_PER_STEP));
}

export const getIsShowMore = (renderedFlightsCount) => {
  return Promise.resolve(validFlights.length >=  renderedFlightsCount);
}

export const getInitialFilters = () => {
  return Promise.resolve(initialFilters);
}

export const getActiveFiltersByAirlines= (selectedSegments) => {
  if (!selectedSegments || selectedSegments.length === 0 ) {
    return Promise.resolve(initialFilters.airlines.map(item => item.uid));
  }
  return Promise.resolve(collectActiveFiltersByAirlines(selectedSegments));
}

export const getActiveFiltersBySegments= (selectedAirlines) => {
  if (!selectedAirlines || selectedAirlines.length === 0 ) {
    return Promise.resolve(initialFilters.segments);
  }
  return Promise.resolve(collectActiveFiltersBySegments(selectedAirlines));
}

export const getActivePrice = () => {
  const activePrice = collectActivePrice(validFlights)
  return Promise.resolve(activePrice);
}

export const getFilteredFlights = ({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice}) => {
  validFlights = filterFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice})
  return Promise.resolve(validFlights.slice(0, COUNT_FLIGHTS_PER_STEP));
}
