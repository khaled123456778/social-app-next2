
"use client"
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { getUserData, userLogin } from '@/app/lib/userSlice';
import { useRouter } from 'next/navigation';
import { store } from '@/app/lib/store';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next/client';
import Link from 'next/link';




export default function Login() {
  let router =useRouter()
 const dispatch = useDispatch< typeof store.dispatch>();

 
  let initialValues ={
      email: '',
      password: '',
  }
const formik = useFormik({
  initialValues,
  onSubmit: async (values) => {
   dispatch(userLogin(values)).then((res)=>{
console.log(res);
if (res?.payload?.message ==="success") {
  router.push("/home")
  console.log(res.payload.token);
  
  setCookie("token",res.payload.token)
  
  
  toast.success(res.payload.message)
}


}).catch((error)=>{console.log(error);
  toast.error("error")
})



  },
});




  return (
    <>
     <form onSubmit={formik.handleSubmit}  >
       <Box sx={{ pt: "100px", width: "50%", m: "auto",height:"100vh" ,mt:"70px"}}>
        
        <Typography component="h3" variant="h3" sx={{ mb: "10px" }}>
          Login:
        </Typography>

        <Stack spacing={2}>
          <Paper elevation={24}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={formik.values.email }
              onChange={formik.handleChange}
              focused
            />
          </Paper>

          <Paper elevation={24}>
            <TextField
              label="Password"
              variant="outlined"
              sx={{ width: "100%"}}
              name="password"
              type="password"
              value={formik.values.password }
              onChange={formik.handleChange}
              focused
            />
          </Paper>
          
          <Link style={{textDecoration:"none" ,color:"black"}} href={"/changeuserpassword"}>
          change your password?
          </Link>
          <Button variant="contained" color="primary" type='submit'  >
            Login
          </Button>
        </Stack>
      </Box>
     </form>
    </>
  )
}

