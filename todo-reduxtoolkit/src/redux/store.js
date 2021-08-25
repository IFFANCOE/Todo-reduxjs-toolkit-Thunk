import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import userReducer from './userSlice'
const store = configureStore({
    
    reducer: {
        todos: todoReducer,
        users:userReducer,
        
    }
})
export default store;