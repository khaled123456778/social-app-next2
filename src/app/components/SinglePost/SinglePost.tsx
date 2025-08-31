"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetails } from "@/app/lib/postSlice";
import { store } from "@/app/lib/store";
import Loading from "@/app/components/Loading/Loading";
import PostCard from "@/app/components/PostCard/PostCard";

type SinglePostProps = {
  id: string;
};

export default function SinglePost({ id }: SinglePostProps) {
  const dispatch = useDispatch<typeof store.dispatch>();

  const { singlePost } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.postReduer
  );

  useEffect(() => {
    if (id) {
      dispatch(getPostDetails(id));
    }
  }, [dispatch, id]);

  if (!singlePost) {
    return <Loading />;
  }

  return <PostCard post={singlePost} showComments={true} />;
}
