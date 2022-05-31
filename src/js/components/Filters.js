import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
  fetchActiveFiltersByAirlines,
  fetchActiveFiltersBySegments,
  fetchActivePrice,
  fetchFilteredFlights,
  fetchIsShowMore,
} from '../store/api-actions'
import FilterBySegments from "./FilterBySegments";
import FilterByPrice from "./FilterByPrice";
import FilterByAirline from "./FilterByAirline";
import {COUNT_FLIGHTS_PER_STEP} from "../const";

function Filters(props) {
  const {
    selectedSegments,
    selectedAirlines,
    fetchFilteredFlights,
    selectedMinPrice,
    selectedMaxPrice,
    fetchActiveFiltersByAirlines,
    fetchActiveFiltersBySegments, activeSort
  } = props

  useEffect(() => {
    fetchFilteredFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort});
  }, [selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort]);

  useEffect(() => {
    fetchActiveFiltersByAirlines(selectedSegments);
  }, [selectedSegments]);

  useEffect(() => {
    fetchActiveFiltersBySegments(selectedAirlines);
  }, [selectedAirlines]);


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
    activeSort: state.APP_STATE.activeSort
});

const mapDispatchToProps = (dispatch) => ({
  fetchFilteredFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort}){
    dispatch(fetchFilteredFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort}))
    dispatch(fetchIsShowMore(COUNT_FLIGHTS_PER_STEP));
    dispatch(fetchActivePrice())

  },
  fetchActiveFiltersByAirlines(selectedSegments){
    dispatch(fetchActiveFiltersByAirlines(selectedSegments))
  },

  fetchActiveFiltersBySegments(selectedAirlines){
    dispatch(fetchActiveFiltersBySegments(selectedAirlines))
  },
});

export {Filters};
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
