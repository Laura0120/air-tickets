import React from "react";
import {connect} from "react-redux";
import {COUNT_FLIGHTS_PER_STEP, SORT_TYPE} from '../const';
import {ActionCreator} from '../store/action'
import {fetchIsShowMore, fetchSortedFlights} from '../store/api-actions';

function Sorting(props) {
  const {activeSort, onChangeSorting} = props
  return (
    <form action="#"
          method='post'
          className={"control-bar__sort"}>
      <h2 className={"control-bar__title"}>Сортировать</h2>
      {Object.keys(SORT_TYPE).map((item) => (
        <div key={SORT_TYPE[item].value}
             className={"control-bar__input-wrapper"}
        >
          <input type='radio' name='sort'
            onChange={(evt) => onChangeSorting(evt)}
            value={SORT_TYPE[item].value}
            id={`sort-${SORT_TYPE[item].value}`}
            checked={activeSort === SORT_TYPE[item].value} />
          <label htmlFor={`sort-${SORT_TYPE[item].value}`} className={"control-bar__label"}>
            {` - ${SORT_TYPE[item].title}`}
          </label>
        </div>
      ))}
    </form>
    );
}

Sorting.propTypes = {
};

const mapStateToProps = (state) => ({
    activeSort: state.APP_STATE.activeSort,
});

const mapDispatchToProps = (dispatch, state) => ({
    onChangeSorting(evt) {
      dispatch(ActionCreator.changeSorting(evt.currentTarget.value));
      dispatch(fetchSortedFlights(evt.currentTarget.value));
      dispatch(fetchIsShowMore(COUNT_FLIGHTS_PER_STEP));
    },

});

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
