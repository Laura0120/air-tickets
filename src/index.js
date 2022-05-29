import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import './scss/style.scss';
import App from './js/components/App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './js/store/reducers/root-reducer';
import {fetchSortedFlights, fetchInitialFilters, fetchActivePrice, fetchIsShowMore} from './js/store/api-actions';
import {SORT_TYPE, COUNT_FLIGHTS_PER_STEP} from './js/const'

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
    ));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
store.dispatch(fetchSortedFlights(SORT_TYPE.ASCENDING_PRICE.value));
store.dispatch(fetchIsShowMore(COUNT_FLIGHTS_PER_STEP));
store.dispatch(fetchInitialFilters())
store.dispatch(fetchActivePrice())

reportWebVitals();
