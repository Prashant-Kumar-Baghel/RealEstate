import { createSlice } from "@reduxjs/toolkit";
const userSlice= createSlice({
    name:"user",
    initialState:null,
    reducers:{
        // addUser:( state,action)=>{
        //     // return action.payload;
        //     state?.items?.push(action.payload)

        // },
        getUser:(state,action)=>{
            return action.payload;
        },
        removeUser:()=>{
            return null;
        }
        // updateUser:()=>{

        // }
    }
})
export const {removeUser,getUser}=userSlice.actions;
export default userSlice.reducer;