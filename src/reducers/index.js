import { combineReducers, createStore } from 'redux';
import reducer from './interest';

const rootReducer = combineReducers({ interest: reducer });

export const store = createStore(rootReducer);
