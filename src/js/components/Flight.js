import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from '../store/action'
import {fetchSortedFlights} from '../store/api-actions';
import {baseUrl} from "../const";
import {adaptFilterLabelBySegments, getHoursAndMinutes} from "../utils";

const localeOptions = {
  month: "short",
  day: "numeric",
  weekday: "short",
  formatMatcher: "basic",
  hour: "2-digit",
  minute: "2-digit",
}
function Flight(props) {
  const {leg} = props
  const {duration, segments} = leg
  const {departureCity, departureAirport, departureDate, airline} = segments[0]
  const {arrivalCity, arrivalAirport, arrivalDate} = segments[[segments.length-1]]
  const [weekdayDeparture, dayDeparture, timeDeparture] = new Date(departureDate).toLocaleDateString("ru-RU", localeOptions).split(",")
  const [weekdayArrival, dayArrival, timeArrival] = new Date(arrivalDate).toLocaleDateString("ru-RU", localeOptions).split(",")

  return (
    <div className={"ticket__flight flight"}>
      <p className={"flight__segment flight__segment--locations"}>
        <span>
        { departureCity ? `${departureCity.caption}, ${departureAirport.caption}` : departureAirport.caption}
          <span className={"flight__airport-uid"}>{` (${departureAirport.uid})`}</span>
        </span>
        <img  className={"flight__icon"}
              src={`${baseUrl}/img/icon-arrow.svg`}
              width={"20"}
              height={"5"}
              alt="иконка  - стрелка вперед"/>
          <span>
          {arrivalCity ? `${arrivalCity.caption}, ${arrivalAirport.caption}` :  arrivalAirport.caption}
          <span className={"flight__airport-uid"}>{` (${arrivalAirport.uid})`}</span>
        </span>
      </p>
      <p className={"flight__segment flight__segment--time"}>
        <span className={"flight__time"}>
          {timeDeparture}
          <span className={"flight__day"}>{`${dayDeparture} ${weekdayDeparture}`}</span>
        </span>
        <span className={"flight__duration"}>
          <img  className={"flight__icon"}
                src={`${baseUrl}/img/icon-clock-display.svg`}
                width={"15"}
                height={"15"}
                alt="иконка - циферблат часов"/>
            {getHoursAndMinutes(duration)}
        </span>
        <span className={"flight__time"}>
          <span className={"flight__day"}>{`${dayArrival} ${weekdayArrival}`}</span>
          {timeArrival}
        </span>
      </p>
      <p className={"flight__segment flight__segment--transfers"}>
        {adaptFilterLabelBySegments(segments.length)}</p>
      <p className={"flight__segment flight__segment--airline"}>Рейс выполняет: {airline.caption}</p>
    </div>
    );
}

Flight.propTypes = {
};

const mapStateToProps = (state) => ({
    activeSort: state.APP_STATE.activeSort,
});

const mapDispatchToProps = (dispatch, state) => ({
    onChangeSorting(evt) {
      dispatch(ActionCreator.changeSorting(evt.currentTarget.value));
      dispatch(fetchSortedFlights(evt.currentTarget.value));
    },

});

export {Flight};
export default connect(mapStateToProps, mapDispatchToProps)(Flight);
