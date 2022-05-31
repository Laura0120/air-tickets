import {COUNT_FLIGHTS_PER_STEP} from "../const";
import {
  aLLFlights,
  filterFlights,
  collectActiveFiltersByAirlines,
  collectActiveFiltersBySegments,
  collectInitialFilters,
  collectActivePrice
} from "./utils";

export const initialFilters = collectInitialFilters(aLLFlights);
export  let validFlights  = [...aLLFlights];

export const getNextFlights = ({currentCount, limit}) => {
  return Promise.resolve(validFlights.slice(currentCount, currentCount + limit));
}

export const getIsShowMore = ({currentCount, limit}) => {
  return Promise.resolve(validFlights.length >  (currentCount + limit));
}

export const getInitialFilters = () => {
  return Promise.resolve(initialFilters);
}

export const getActiveFiltersByAirlines = (params) => {
  return Promise.resolve(collectActiveFiltersByAirlines(params));
}

export const getActiveFiltersBySegments = (params) => {
  return Promise.resolve(collectActiveFiltersBySegments(params));
}

export const getActivePrice = () => {
  const activePrice = collectActivePrice(validFlights)
  return Promise.resolve(activePrice);
}

export const getFilteredFlights = (params) => {
  validFlights = filterFlights(params)
  return Promise.resolve(validFlights.slice(0, COUNT_FLIGHTS_PER_STEP));
}
