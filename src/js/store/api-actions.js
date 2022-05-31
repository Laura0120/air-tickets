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

export const fetchIsShowMore = (renderedFlightsCount) => async (dispatch, _getState) => {
    const inShowMore = await getIsShowMore(renderedFlightsCount);
    dispatch(ActionCreator.loadIsShowMore(inShowMore));
}

export const fetchNextFlights = (currentAmount) => async (dispatch, _getState) => {
    const flights = await getNextFlights(currentAmount);
    dispatch(ActionCreator.loadNextFlights(flights));
}

export const fetchInitialFilters = () => async (dispatch, _getState) => {
    const initialFilters = await getInitialFilters();
    dispatch(ActionCreator.loadInitialFilters(initialFilters));
}

export const fetchFilteredFlights = ({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort}) => async (dispatch, _getState) => {
    const flights = await getFilteredFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort});
    dispatch(ActionCreator.loadFilteredFlights(flights));
}

export const fetchActiveFiltersBySegments = (selectedAirlines) => async (dispatch, _getState) => {
    const activeSegments= await getActiveFiltersBySegments(selectedAirlines);
    dispatch(ActionCreator.loadActiveSegments(activeSegments));
}

export const fetchActiveFiltersByAirlines = (selectedSegments) => async (dispatch, _getState) => {
    const activeAirliners= await getActiveFiltersByAirlines(selectedSegments);
    dispatch(ActionCreator.loadActiveAirliners(activeAirliners));
}

export const fetchActivePrice = () => async (dispatch, _getState) => {
    const {minPrice, maxPrice} = await getActivePrice();
    dispatch(ActionCreator.loadActiveMinPrice(Number(minPrice)));
    dispatch(ActionCreator.loadActiveMaxPrice(Number(maxPrice)));
}
