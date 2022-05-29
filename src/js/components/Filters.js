import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchActivePrice, fetchFilteredFlights, fetchIsShowMore} from '../store/api-actions'
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
    fetchActivePrice
  } = props

  useEffect(() => {
    fetchFilteredFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice});
    fetchActivePrice();
  }, [selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice]);

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
    selectedMaxPrice: state.APP_STATE.selectedMaxPrice
});

const mapDispatchToProps = (dispatch) => ({
  fetchFilteredFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice}){
    dispatch(fetchFilteredFlights({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice}))
    dispatch(fetchIsShowMore(COUNT_FLIGHTS_PER_STEP));
  },
  fetchActivePrice(){
    dispatch(fetchActivePrice())
  }
});

export {Filters};
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
