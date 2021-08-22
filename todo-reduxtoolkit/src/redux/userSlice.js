import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "users",
    initialState:[],
    reducers:{
        addUser: (state,action)=>{
            const newUser ={
                id:Date.now(),
                email:action.payload.email,
                password:action.payload.password
            }
        }
    }
})

export const {} = userSlice.actions

export default userSlice.reducer