import React from 'react'
import { Comment } from '../../types/types';
import { Avatar, Box, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import userImg from  "../../../../assets/download.png"




export default function CommentCard({comment}:{comment:Comment}) {
function getImgSrc(imgSrc?: string) {
  if (!imgSrc || imgSrc.includes("undefined")) {
    return userImg; // صورة افتراضية
  } else {
    return imgSrc;
  }
}



  return <>
  <Stack rowGap={2}>
    <Box >
    <CardHeader

  avatar={
    <Avatar sx={{ bgcolor: "red", width: 40, height: 40 }} aria-label="recipe">
      <Image
        src={getImgSrc(comment?.commentCreator.photo)}
        
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
  title={comment?.commentCreator.name}
  subheader={new Date(comment?.createdAt).toLocaleDateString()}
/>

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {comment?.content}
        </Typography>
      </CardContent>
  </Box>
  </Stack>
    </>
}
