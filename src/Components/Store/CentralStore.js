import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './Auth-slice'

const store = configureStore({
    reducer:{auth: authSliceReducer}
})

export default store;