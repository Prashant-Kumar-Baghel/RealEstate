import { createSlice } from "@reduxjs/toolkit";

const featureSlice=createSlice({
    name:"features",
    initialState:{
        bhkData:null,
        furnishingData:null,
        ispropertyRent:true
    },
    reducers:{
        addBHK:(state,action)=>{
            state.bhkData=action.payload;
        },
        addFurnishing:(state,action)=>{
            state.furnishingData=action.payload;
        },
        addPropertyType:(state,action)=>{
            state.ispropertyRent=action.payload;
        }
    }
})
export const {addBHK,addFurnishing,addPropertyType}=featureSlice.actions;
export default featureSlice.reducer;