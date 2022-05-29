import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from '../store/action'

function FilterByPrice(props) {
  const {
    onChangeMinPrice,
    selectedMinPrice,
    onChangeMaxPrice,
    selectedMaxPrice,
    activeMinPrice,
    activeMaxPrice
  } = props

  return (
    <fieldset className={"control-bar__filter"}>
      <legend className={"control-bar__title"}>Цена</legend>
      <div className={"control-bar__input-wrapper"}>
        <label htmlFor={`price-min`} className={"control-bar__label control-bar__label--price"}>
          От
        </label>
        <input type={"number"}
               name={`price-min`}
               id={`price-min`}
               step={1000}
               placeholder={Number(activeMinPrice)}
               value={selectedMinPrice}
               onChange={onChangeMinPrice}
               className={"control-bar__input-price"}
        />
      </div>
      <div className={"control-bar__input-wrapper"}>
        <label htmlFor={`price-max`} className={"control-bar__label control-bar__label--price"} >
          До
        </label>
        <input type="number"
               name={`price-max`}
               id={`price-max`}
               step={1000}
               placeholder={Number(activeMaxPrice)}
               value={selectedMaxPrice}
               onChange={onChangeMaxPrice}
               className={"control-bar__input-price"}
        />
      </div>
    </fieldset>
    );
}

FilterByPrice.propTypes = {
};

const mapStateToProps = (state) => ({
  selectedMinPrice: state.APP_STATE.selectedMinPrice,
  selectedMaxPrice: state.APP_STATE.selectedMaxPrice,
  activeMinPrice: state.DATA.activeMinPrice,
  activeMaxPrice: state.DATA.activeMaxPrice

});

const mapDispatchToProps = (dispatch) => ({
  onChangeMinPrice(evt) {
      dispatch(ActionCreator.changeMinPrice(evt.currentTarget.value));
    },
  onChangeMaxPrice(evt) {
      dispatch(ActionCreator.changeMaxPrice(evt.currentTarget.value));
    },
});

export {FilterByPrice};
export default connect(mapStateToProps, mapDispatchToProps)(FilterByPrice);
