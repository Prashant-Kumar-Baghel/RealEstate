import {  configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import propertyReducer from "./propertySlice"
// import storage from "redux-persist/lib/storage";
// import persistReducer from "redux-persist/es/persistReducer";
// const persistConfig={
//     key:"root",
//     version:1,
//     storage
// }
// const reducer=combineReducers({
//     user:userReducer,
//     // property:propertyReducer
// })
// const persistedReducer=persistReducer(persistConfig,reducer);
const appStore= configureStore({
    // app reducer have different reducer for different slices. 
    reducer:{
        user:userReducer,
        property:propertyReducer
    }
    // reducer: persistedReducer
    //     
        
})
export default appStore;
// Q:-What is React Persist?
//  Ans:- a) Redux Persist is a library used with Redux, a state management tool commonly used in React applications. Its main purpose is to help persist the Redux store state across page reloads or application restarts.
// b)Redux Persist helps you save that Redux store state into something more permanent, like local storage in your browser or AsyncStorage in React Native apps. So, when you reload the page or reopen the app, Redux Persist retrieves the stored state from wherever it's saved and puts it back into the Redux store. This way, you don't lose any of your changes, and the app feels more seamless and user-friendly.
