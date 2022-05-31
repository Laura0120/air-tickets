import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ActionCreator} from '../store/action'
import {adaptFilterLabelBySegments} from '../utils'
import {fetchActiveFiltersByAirlines} from '../store/api-actions'

function FilterBySegments(props) {
  const {initialFilter,
    activeSegments,
    selectedSegments,
    selectedAirlines,
    onChangeSegments,
    selectedMinPrice,
    selectedMaxPrice,
  } = props

  return (
    <fieldset className={"control-bar__filter"}>
      <legend className={"visually-hidden"}>Количество пересадок</legend>
      {initialFilter.map((item) => {
         const isDisabled = (selectedAirlines.length > 0 || selectedMinPrice || selectedMaxPrice)  && !activeSegments.includes(item)
         return (
            <div key={item}
                 className={"control-bar__input-wrapper"}
            >
              <input type={'checkbox'}
                     name={'segmentsCount'}
                     value={item}
                     id={`segmentsCount-${item}`}
                     disabled={isDisabled}
                     checked={selectedSegments.includes(item)}
                     onChange={(evt) => {
                       onChangeSegments(evt, selectedSegments.includes(item))
                     }}
              />
              <label htmlFor={`segmentsCount-${item}`} className={"control-bar__label"} >
                {` - ${adaptFilterLabelBySegments(item)}`}
              </label>
            </div>
          )
        })}
    </fieldset>
    );
}

FilterBySegments.propTypes = {
};

const mapStateToProps = (state) => ({
    initialFilter: state.DATA.initialFilters.segments,
    activeSegments: state.DATA.activeSegments,
    selectedSegments: state.APP_STATE.selectedSegments,
    selectedAirlines: state.APP_STATE.selectedAirlines,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSegments(evt, change) {
      change ?
      dispatch(ActionCreator.removeSegmentFromFilter(Number(evt.currentTarget.value))):
      dispatch(ActionCreator.addSegmentToFilter(Number(evt.currentTarget.value)));
    },
});

export {FilterBySegments};
export default connect(mapStateToProps, mapDispatchToProps)(FilterBySegments);
