"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postState } from '../types/types';
import axios from "axios";
import { stat } from "fs";
import { getCookie } from "cookies-next/client";

export let getAllPosts =createAsyncThunk(
    "postSlice/getAllPosts",async()=>{
    let {data}=await axios.get("https://linked-posts.routemisr.com/posts?limit=50",{headers:{token:getCookie("token")}})
    return data
    }
)
export let getPostDetails =createAsyncThunk(
    "postSlice/getPostDetails",async(id :string)=>{
    let {data}=await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{headers:{token:getCookie("token")}})
    return data
    }
)


  let initialState:postState={
        isLoding:true,
    isError:false,
    posts:null,
singlePost:null,
showComments:false
    } 
export let postSlice = createSlice(
  
    {
        name:"postSlice",
        initialState,

        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getAllPosts.fulfilled,(state,action)=>{
state.isError=false,
state.isLoding=false,
state.showComments=false
state.posts=action.payload.posts
// console.log(action.payload);

            }
           
        ),
         builder.addCase(getAllPosts.rejected,(state,action)=>{
            console.log("error");
            state.isError=true
            
            
         }),
      builder.addCase(getPostDetails.fulfilled,(state, action) => {
  state.singlePost = action.payload.post;
  state.isLoding =false
 
//   console.log(action.payload);
});

         builder.addCase(getPostDetails.rejected,(state,action)=>{
        console.log(action.error,"error");
        
         })



        }

    }
)
export let postReduer=postSlice.reducer