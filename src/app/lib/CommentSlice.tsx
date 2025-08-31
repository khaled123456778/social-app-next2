// commentSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next/client";


interface Comment {
  _id: string;
  postId: string;
  text: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
}

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};
const body={
    content:"" as string,
    post:"" as string
}

export let createComment = createAsyncThunk(
   "userSlice/getUserPosts" ,async(body:{content:string,post:string})=>{
     let{data} =await axios.post("https://linked-posts.routemisr.com/comments",body,{headers:{
 "token":getCookie("token")
    }
})

return data
   }
)
const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
   
  },
  extraReducers:(builder)=>{
      builder.addCase(createComment.fulfilled,(state,action)=>{
      
          console.log(action.payload);
           }),
  
  builder.addCase(createComment.rejected,()=>{
      console.log("error");
  })

}

});




export  let commentResucer= commentSlice.reducer;
