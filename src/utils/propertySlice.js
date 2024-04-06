import { createSlice } from "@reduxjs/toolkit"

const propertySlice=createSlice({
    name:"property",
    initialState:{
        items:[],
    },
    reducers:{
        addProperty:(state,action)=>{
            console.log("action",action.payload)
            state.items=[...action.payload]
            console.log("action.payload",state.items)
            // return action.payload;
        },
        returnProperty:(state,action)=>{
            console.log("return",action.payload);
            return action.payload;
        }
    }
})

export const {addProperty,returnProperty}=propertySlice.actions
export default propertySlice.reducer;




