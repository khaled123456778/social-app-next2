"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/app/lib/store";
import React from "react";
import { getAllPosts } from "@/app/lib/postSlice";
import ImgInput from "@/app/components/ImgInput/ImgInput";
import Loading from "@/app/components/Loading/Loading";
import PostCard from "@/app/components/PostCard/PostCard";
import ImgUpdate from "@/app/components/ImgUpdate/ImgUpdate";


export default function Home() {
    let dispatch = useDispatch<typeof store.dispatch>()
  React.useEffect(() => {
    dispatch(getAllPosts())
  
  
  }, [dispatch])
  
let {isError,isLoding,posts} =useSelector((state:ReturnType<typeof store.getState>)=>{return state.postReduer})
// console.log(posts);


// if (isLoding) {
//   return <h1>Loading</h1>
// }
  return (
  
    <Box >
     <ImgUpdate />
       <ImgInput/>
{isLoding?<Loading/>:posts?.map((post)=>{return <PostCard  key={post._id} post={post} showComments={false}/> })}



    </Box>
  
  );
}
