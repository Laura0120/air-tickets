import {ActionCreator} from "./action";
import {
    getInitialFilters,
    getFilteredFlights,
    getActiveFiltersByAirlines,
    getActiveFiltersBySegments,
    getActivePrice,
    getNextFlights,
    getIsShowMore
} from '../api/api'

export const fetchIsShowMore = (paging) => async (dispatch, _getState) => {
    const inShowMore = await getIsShowMore(paging);
    dispatch(ActionCreator.loadIsShowMore(inShowMore));
}

export const fetchNextFlights = (paging) => async (dispatch, _getState) => {
    const flights = await getNextFlights(paging);
    dispatch(ActionCreator.loadNextFlights(flights));
}

export const fetchInitialFilters = () => async (dispatch, _getState) => {
    const initialFilters = await getInitialFilters();
    dispatch(ActionCreator.loadInitialFilters(initialFilters));
}

export const fetchFilteredFlights = (params) => async (dispatch, _getState) => {
    const flights = await getFilteredFlights(params);
    dispatch(ActionCreator.loadFilteredFlights(flights));
}

export const fetchActiveFiltersBySegments = (params) => async (dispatch, _getState) => {
    const activeSegments= await getActiveFiltersBySegments(params);
    dispatch(ActionCreator.loadActiveSegments(activeSegments));
}

export const fetchActiveFiltersByAirlines = (params) => async (dispatch, _getState) => {
    const activeAirliners= await getActiveFiltersByAirlines(params);
    dispatch(ActionCreator.loadActiveAirliners(activeAirliners));
}

export const fetchActivePrice = () => async (dispatch, _getState) => {
    const {minPrice, maxPrice} = await getActivePrice();
    dispatch(ActionCreator.loadActiveMinPrice(Number(minPrice)));
    dispatch(ActionCreator.loadActiveMaxPrice(Number(maxPrice)));
}
