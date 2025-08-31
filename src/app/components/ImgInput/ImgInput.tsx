// with useRef
// "use client"
// import { Container, TextField } from '@mui/material'
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import React, { useRef } from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useFormik } from 'formik';

// export default function ImgInput() {
//     let postBody =useRef<HTMLInputElement>(null)
//     let postImg =useRef<HTMLInputElement>(null)
//      async function createPost() {
    
//       const body=postBody.current?.value;
//       const image=postImg.current?.files[0] || "";
//          const postData=new FormData()
//     postData.append("body",body||"")
//     postData.append("image",image)
//     let {data}=await axios.post("https://linked-posts.routemisr.com/posts",postData,{headers:{token:localStorage.getItem("token")}})
    
  
//     // console.log(data.message);

//     if (data.message==="success") {
//       toast.success("Post Created Successfully")
//     }
    
//     }
 
//     const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });
//   return <>
//   <Container>
//   <TextField placeholder='what is in your mind ?' fullWidth minRows={6} sx={{m:"auto" ,my:"20px" ,pt:"70px"}} rows={9} multiline  inputRef={postBody} name='body' /> 
    

 
//   <Stack direction="row" spacing={2}>
//      <Button
//   component="label"
//   role={undefined}
//   variant="contained"
//   tabIndex={-1}
//   startIcon={<CloudUploadIcon />}
// >
//   Upload files
//   <VisuallyHiddenInput
//   ref={postImg}
//     type="file"
//     onChange={(event) => console.log(event.target.files)}
//     multiple
//     name="image"
//   />
// </Button>
    
//       <Button onClick={createPost} variant="contained" endIcon={<SendIcon />}>
//         Send
//       </Button>
//     </Stack>

//   </Container>
//   </>
// }



// with formik

"use client";
import { Container, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { blueGrey } from "@mui/material/colors";

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

export default function ImgInput() {

  const formik = useFormik({
    initialValues: {
      body: "" as string,
      image: null as File | null,
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("body", values.body);
      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        const { data } = await axios.post(
          "https://linked-posts.routemisr.com/posts",
          formData,
          {
            headers: {
              token: localStorage.getItem("token") || "",
            },
          }
        );

        if (data.message === "success") {
          toast.success("Post Created Successfully");
          resetForm();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Container >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          placeholder="What is in your mind?"
          fullWidth
          minRows={6}
          sx={{ m: "auto", my: "20px", pt: "70px" }}
          rows={9}
          multiline
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
        />

        <Stack direction="row" spacing={2}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              name="image"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  formik.setFieldValue("image", file);
                }
              }}
            />
          </Button>

          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
