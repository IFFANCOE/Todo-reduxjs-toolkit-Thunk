import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const getUsersAsync = createAsyncThunk(
    'users/getUsersAsync',
    async () => {
        const res = await axios.get('http://localhost:4000/users').catch(err => console.log(err));
        if (res.data) {
            const users = res.data
            return { users }
        }
    }
)

const userSlice = createSlice({
    name: "users",
    initialState: [],
    // reducers: {
    //     addUser: (state, action) => {
    //         const newUser = {
    //             id: Date.now(),
    //             email: action.payload.email,
    //             password: action.payload.password
    //         }
    //     }
    // },
    extraReducers:{
        [getUsersAsync.pending]: (state, action) =>{
            console.log('get data...');
        },
        [getUsersAsync.fulfilled]: (state, action) =>{
            console.log('get data successfully!...return your users',action.payload.users);
            return action.payload.users
        }
    }
})

export const { addUser} = userSlice.actions

export default userSlice.reducer