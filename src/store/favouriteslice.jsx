import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
const initialState= []
 const fovouriteslice=createSlice({
name : "favourite",
initialState,
reducers :{
    add(state,action){
        const newItem = action.payload;
        const isDuplicate = state.some((item) => item.id === newItem.id);
        if(isDuplicate){
            alert("Already Added")
    }else{
         state.push(action.payload)
    }},
    remove(state,action){
 return state.filter((item)=>{ return item.id!==action.payload})
    }
}

 })
 export const {add,remove} =fovouriteslice.actions
 export default fovouriteslice.reducer;