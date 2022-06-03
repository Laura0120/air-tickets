import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from '../store/action'

function FilterByAirline(props) {
  const {initialFilter,
    activeAirlines,
    selectedAirlines,
    onChangeAirline,
  } = props

  return (
    <fieldset className={"control-bar__filter"}>
      <legend className={"control-bar__title"}>Авиокомпании</legend>
      {initialFilter.map(({uid, caption}) => {
        const activeAirline = activeAirlines.find((item) => item.uid === uid)
        const isDisabled = !activeAirline;

        return (
          <div key={uid}
               className={"control-bar__input-wrapper"}>
            <input type={'checkbox'}
                   name={'airline'}
                   value={uid}
                   id={`airline-${uid}`}
                   disabled={isDisabled}
                   checked={selectedAirlines.includes(uid)}
                   onChange={(evt) => {
                     onChangeAirline(evt, selectedAirlines.includes(uid))
                   }}
            />
            <label htmlFor={`airline-${uid}`} className={"control-bar__label"} >
              <span className={"control-bar__airline-name"}>{` - ${caption}`}</span>
              {isDisabled || <span className={"control-bar__min-price-footnote"}> {
                `от ${activeAirline.minPrice} p.`
              }</span>}
            </label>
          </div>
        )
      })}
    </fieldset>
    );
}

FilterByAirline.propTypes = {
};

const mapStateToProps = (state) => ({
  initialFilter: state.DATA.initialFilters.airlines,
  activeAirlines: state.DATA.activeAirlines,
  selectedAirlines: state.APP_STATE.selectedAirlines,

});

const mapDispatchToProps = (dispatch) => ({
  onChangeAirline(evt, change) {
      change ?
      dispatch(ActionCreator.removeAirlineFromFilter(evt.target.value)):
      dispatch(ActionCreator.addAirlineToFilter(evt.target.value));
    },
});

export {FilterByAirline};
export default connect(mapStateToProps, mapDispatchToProps)(FilterByAirline);
