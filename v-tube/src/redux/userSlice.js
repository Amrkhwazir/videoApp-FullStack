import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false
  };
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        loginStart: (state) => {
            state.loading = true
        },

        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },

        loginFailure: (state) => {

            state.loading = false
            state.error = true
        },
        logout: (state) => {
         return   initialState
        },
        subscription : (state, action) => {
            if(state.currentUser.subscribedChanel.includes(action.payload)){
                state.currentUser.subscribedChanel.splice(state.currentUser.subscribedChanel.findIndex(chanelId => chanelId === action.payload),1);
            }else{
                state.currentUser.subscribedChanel.push(action.payload);
            }
        }

    },
  })

  export const {loginStart, loginSuccess, loginFailure, logout, subscription} =userSlice.actions;
  export default userSlice.reducer