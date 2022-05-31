import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
  fetchActiveFiltersByAirlines,
  fetchActiveFiltersBySegments,
  fetchActivePrice,
  fetchFilteredFlights,
  fetchInitialFilters,
  fetchIsShowMore,
} from '../store/api-actions'
import FilterBySegments from "./FilterBySegments";
import FilterByPrice from "./FilterByPrice";
import FilterByAirline from "./FilterByAirline";
import {COUNT_FLIGHTS_PER_STEP} from "../const";

function Filters(props) {
  const {
    activeSort,
    flights,
    selectedSegments,
    selectedAirlines,
    selectedMinPrice,
    selectedMaxPrice,
    fetchActiveFiltersByAirlines,
    fetchActiveFiltersBySegments,
    fetchFilteredFlights,
    fetchInitialFilters
  } = props

  useEffect(() => {
    fetchInitialFilters()
  }, []);

  useEffect(() => {
    fetchFilteredFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort, flights});
  }, [selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort]);

  useEffect(() => {
    fetchActiveFiltersByAirlines({selectedSegments, selectedMinPrice, selectedMaxPrice});
  }, [selectedSegments, selectedMinPrice, selectedMaxPrice]);

  useEffect(() => {
    fetchActiveFiltersBySegments({selectedAirlines, selectedMinPrice, selectedMaxPrice});
  }, [selectedAirlines, selectedMinPrice, selectedMaxPrice]);


  return (
    <form action="#" method='post'>
      <h2 className={"control-bar__title"}>Фильтровать</h2>
      <FilterBySegments />
      <FilterByPrice />
      <FilterByAirline />
    </form>
    );
}

Filters.propTypes = {
};

const mapStateToProps = (state) => ({
    selectedSegments: state.APP_STATE.selectedSegments,
    selectedAirlines: state.APP_STATE.selectedAirlines,
    selectedMinPrice: state.APP_STATE.selectedMinPrice,
    selectedMaxPrice: state.APP_STATE.selectedMaxPrice,
    flights: state.DATA.flights,
    activeSort: state.APP_STATE.activeSort
});

const mapDispatchToProps = (dispatch) => ({
  fetchFilteredFlights(params){
    const {flights} = params;
    const paging = {currentCount: flights.length, limit: COUNT_FLIGHTS_PER_STEP}
    dispatch(fetchFilteredFlights(params))
    dispatch(fetchIsShowMore(paging))
    dispatch(fetchActivePrice())
  },
  fetchActiveFiltersByAirlines(params){
    dispatch(fetchActiveFiltersByAirlines(params))
  },
  fetchActiveFiltersBySegments(params){
    dispatch(fetchActiveFiltersBySegments(params))
  },
  fetchInitialFilters(){
    dispatch(fetchInitialFilters())
  },
});

export {Filters};
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
