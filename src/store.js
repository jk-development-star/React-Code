import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import UserReducer from './reducers/UserReducer'
import LeadReducer from "./reducers/LeadReducer"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const middleware = [thunk];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
)
const reducer = combineReducers({
    user: UserReducer,
    lead: LeadReducer,
})
const persistConfig = {
    key: 'rootData',
    storage,

};


const persistedReducer = persistReducer(persistConfig, reducer, composedEnhancers);
// const initialState = {}
// const store = configureStore({ reducer: reducer, initialState, composeWithDevTools });

const store = configureStore({
    reducer: persistedReducer,
    composedEnhancers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

});

const persistor = persistStore(store);

export { store, persistor };
