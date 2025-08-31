"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookie } from "cookies-next/client";
import { userToken, NewPassword } from '../types/types';
import { useRouter } from "next/router";



 let initialState:userToken ={
    token:null,
    userData:null,
    userPosts:null
 }
 

 

export let userLogin = createAsyncThunk("userSlice/userLogin",async (values:{email:string,
    password:string
})=>{let {data} =await axios.post("https://linked-posts.routemisr.com/users/signin",values)
return  data}
)


export let getUserData = createAsyncThunk(
   "userSlice/getUserData" ,async()=>{
    let{data} =await axios.get("https://linked-posts.routemisr.com/users/profile-data",{headers:{
 "token":getCookie("token")
    }
    
})

return data

   }
)
export let getUserPosts = createAsyncThunk(
   "userSlice/getUserPosts" ,async()=>{
     let{data} =await axios.get("https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=2",{headers:{
 "token":getCookie("token")
    }
})

return data
   }
)

export let ChangeUserPassword = createAsyncThunk("userSlice/ChangeUserPassword",async (values:{password:string,
    newPassword:string
})=>{let {data} =await axios.patch("https://linked-posts.routemisr.com/users/change-password",values,{headers:{token:localStorage.getItem("token")}})
return data
}
)
  export const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{

    },

extraReducers:(builder)=>{
    builder.addCase(userLogin.fulfilled,(state,action)=>{
        state.token=action.payload.token
        localStorage.setItem("token",state.token=action.payload.token)
        // console.log(action.payload);
         }),

builder.addCase(userLogin.rejected,()=>{
    console.log("error");
}),
 builder.addCase(getUserData.fulfilled,(state,action)=>{
    state.userData=action.payload?.user

        // console.log(action.payload?.user);
         }),

builder.addCase(getUserData.rejected,()=>{
    console.log("error");
}),

// cahnge Password
 builder.addCase(ChangeUserPassword.fulfilled,(state,action)=>{

// console.log(action?.payload);

       
         }),

builder.addCase(ChangeUserPassword.rejected,()=>{
    console.log("error");
})
// get user posts
 builder.addCase(getUserPosts.fulfilled,(state,action)=>{

console.log(action?.payload?.posts);
state.userPosts=action.payload?.posts



       
         }),

builder.addCase(getUserPosts.rejected,()=>{
    console.log("error");
})

}

})

 export const tokenReducer=userSlice.reducer