"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetails } from "@/app/lib/postSlice";
import { store } from "@/app/lib/store";
import Loading from "@/app/components/Loading/Loading";
import PostCard from "@/app/components/PostCard/PostCard";

type PageProps = {
  params: {
    id: string;
  };
};

export default function SinglePost({ params }: PageProps) {
  const dispatch = useDispatch<typeof store.dispatch>();

  const { singlePost } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.postReduer
  );

  useEffect(() => {
    if (params.id) {
      dispatch(getPostDetails(params.id));
    }
  }, [dispatch, params.id]);

  if (!singlePost) {
    return <Loading />;
  }

  return <PostCard post={singlePost} showComments={true} />;
}
