import React, {useEffect} from "react";
import Sorting from "./Sorting";
import Filters from "./Filters";
import Ticket from "./Ticket";
import {fetchIsShowMore, fetchNextFlights} from "../store/api-actions";
import {connect} from "react-redux";
import {COUNT_FLIGHTS_PER_STEP} from "../const";

function App(props) {
  const {flights, fetchNextFlights, isShowMore} = props
  const ticketsRef = document.querySelector(".tickets");

  useEffect(() => {
    ticketsRef && ticketsRef.scrollIntoView(false)
  }, [flights]);

  return (
    <div className={"wrapper"}>
      <main className={"main"}>
        <h1 className={"visually-hidden"}>Результат поиска перелётов</h1>
        <div className={"container"}>
          <div className={"control-bar"}>
            <Sorting/>
            <Filters/>
          </div>
          <div className={"tickets"}>
            <h2 className={"visually-hidden"}>Билеты</h2>
            {flights.length === 0 &&
            <p className={"tickets__not-found"}>Ничего не найдено</p>}
            {flights.length > 0 &&
            <ul className={"tickets__list"}>
              {flights.map((item, index) => (
                <li key={index} className={"tickets__item"}>
                  <Ticket flight={item.flight} />
                </li>
              ) )}
            </ul>}
            {isShowMore &&
            <button
              type={"button"}
              className={"tickets__button"}
              onClick = {()=>{
                fetchNextFlights(flights.length)
              }}
            >
              Показать ещё
            </button>
            }
          </div>
        </div>
      </main>
    </div>
  );
}


App.propTypes = {
};

const mapStateToProps = (state) => ({
  flights: state.DATA.flights,
  isShowMore: state.DATA.isShowMore,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNextFlights(currentAmount){
    dispatch(fetchNextFlights(currentAmount))
    dispatch(fetchIsShowMore(currentAmount + COUNT_FLIGHTS_PER_STEP));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
