import { combineReducers } from "redux";
import provider from './provider';
import client from './client';
import currentProduct from './currentProduct';

const allReducers = combineReducers({

    provider,
    client,
    currentProduct

});

export default allReducers;