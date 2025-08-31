"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Card, CardHeader, CardContent, CardActions,
  Avatar, IconButton, Typography, Box,
  Button, Grid, Paper, TextField
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { Post } from '@/app/types/types';
import Image from 'next/image';
import CommentCard from '../../(pages)/commentCard/CommentCard';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { store } from '@/app/lib/store';
import { createComment } from '@/app/lib/CommentSlice';

export default function PostCard({ post, showComments }: { post: Post; showComments: boolean }) {
  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const CommentInpt = React.useRef<HTMLInputElement | null>(null)
 const dispatch = useDispatch<typeof store.dispatch>()
  let initialValues:CreateComment={
    content:"",
    post:""
  }
  type CreateComment={
    content:"",
    post:""
  }
 const formik = useFormik({
  initialValues,
  onSubmit: (values,{resetForm}) => {
    dispatch(createComment({
      post: post._id,
      content: values.content,
    }));
    formik.resetForm(); // Reset بعد الإرسال
    // setShowCommentInput(false); // إخفاء الانبوت بعد الإرسال لو حابب
  }
});

  // const [commentText, setCommentText] = React.useState('');

  // const handleSendComment = () => {
  //   if (commentText.trim()) {
  //     console.log('Send:', commentText);
  //     setCommentText('');
  //   }
  // };

  return (
    <Grid container justifyContent="center" alignItems="flex-start" sx={{ mt: 4 }}>
      <Grid size={3}>   
      </Grid>
      <Grid size={6}>   
        
          <Card sx={{ width: "100%", mt: 2, pt: 3 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500], width: 40, height: 40 }}>
                  <Image
                    src={post?.user.photo}
                    alt="user avatar"
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%' }}
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.user.name}
              subheader={new Date(post.createdAt).toLocaleDateString()}
            />

            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {post.body}
              </Typography>
            </CardContent>

            {post.image && typeof post.image === 'string' && (
              <Link href={`/PostDetails/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                 <Box
                sx={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  mt: 2,
                }}
              >
                <Image
                  src={post.image}
                  alt="Post Image"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              </Link>
             
            )}

            <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>

              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>

              <IconButton
                aria-label="comment"
                onClick={(e) => {
                
                  setShowCommentInput(showCommentInput => !showCommentInput);
                }}
              >
                <CommentIcon />
              </IconButton>
            </CardActions>

           {showCommentInput && (
  <Box sx={{ width: '100%', my: 2, px: 2 }}>
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <TextField
        fullWidth
        placeholder="Write a comment..."
        variant="outlined"
        size="small"
        inputRef={CommentInpt}
        value={formik.values.content}
        name="content"
        onChange={formik.handleChange}
      />
      <IconButton color="primary" type="submit">
        <SendIcon />
      </IconButton>
    </form>
  </Box>
)}

          </Card>
       

      {!showComments && (
  <Link href={`/PostDetails/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <Button sx={{ mt: 2 }}>Show More Comments</Button>
  </Link>
)}

<Paper elevation={10} sx={{ my: 2, borderRadius: 2 }}>
  {post?.comments?.length > 0 && !showComments && (
    <CommentCard comment={post.comments[0]} />
  )}
</Paper>


        {post?.comments?.length > 1 && showComments && post.comments.map((comment) => (
          <Paper key={comment._id} elevation={10} sx={{ my: 3, borderRadius: 2 }}>
            <CommentCard comment={comment} />
          </Paper>
        ))}
      </Grid>
      <Grid size={3}>   
      </Grid>
    </Grid>
  );
}
