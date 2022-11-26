import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/reducer'

const store = configureStore({ reducer: reducer, composeWithDevTools });


export default store
