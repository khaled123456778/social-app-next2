"use client";

import React from "react";
import {
  Container,
  TextField,
  Stack,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";

import axios from "axios";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next/client";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/app/lib/store";
import { getUserData, tokenReducer } from '../../lib/userSlice';


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImgUpdate() {
 
let {userData}=useSelector((state:ReturnType<typeof store.getState>)=>{
  return state.tokenReducer

})

const dispatch=useDispatch<typeof store.dispatch>()

  const formik = useFormik({
    initialValues: {
      
      photo: null as File | null,
    },
    onSubmit: async (values,{resetForm}) => {
      const formData = new FormData();
     
      if (values.photo) {
        formData.append("photo", values.photo);
          try {
        const { data } = await axios.put(
          "https://linked-posts.routemisr.com/users/upload-photo",
          formData,
          {
            headers: {
              token: getCookie("token") || "",
            },
          }
        );

        if (data.message === "success") {
          toast.success("photo updated Successfully");
          dispatch(getUserData())
          // window.location.reload();
          formik.resetForm();

        
        }
      } catch (error) {
        toast.error("Something went wrong");
      }

      }

    
    },
  });

  return (
     <Container maxWidth="sm" sx={{ mt: 15, display:"flex",flexDirection:"column", alignItems:"center" }} >
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 5,
          boxShadow: 3,
          backgroundColor: "#fff",
          
         
        }}
      >
         <Avatar alt="User" sx={{width:"200px",height:"200px",mx:"auto"}} src={userData?.photo} />
        <Typography variant="h5" gutterBottom sx={{mt:3}}>
          Update Your Profile photo
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
              <VisuallyHiddenInput
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    formik.setFieldValue("photo", file);
                  }
                }}
              />
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              update
            </Button>
          </Stack>

          {formik.touched.photo && formik.errors.photo && (
            <Typography color="error" mt={1}>
              {formik.errors.photo}
            </Typography>
          )}

          {formik.values.photo && (
            <Typography mt={1}>
              تم اختيار الملف: <strong>{formik.values.photo.name}</strong>
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
}
