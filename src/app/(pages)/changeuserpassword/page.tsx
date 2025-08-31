"use client"
import { store } from '@/app/lib/store';
import { ChangeUserPassword } from '@/app/lib/userSlice';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { setCookie } from 'cookies-next/client';
import { useFormik } from 'formik';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function changeuserpassword() {
    type ChangePasword={
         password:string,
    newPassword:string
    }
    let initialValues:ChangePasword={
         password:"",
    newPassword:""
    }
   const router =useRouter()
   const dispatch= useDispatch<typeof store.dispatch>()
   const formik=useFormik({
    initialValues,
    onSubmit:(values)=>{
       dispatch(ChangeUserPassword(values)).then((res)=>{
console.log(res);
setCookie("newToken",res.payload.token)
if (res?.payload?.message==="success") {
    router.push("/")
    toast.success("YouPassword Updated Successfully")
    
}



       }).catch((error)=>{
console.log(error);
toast.error("error")

       })
// router.push("/")
        
        
    }
   })
  return (
    <>
     <form onSubmit={formik.handleSubmit} >
       <Box sx={{ pt: "100px", width: "50%", m: "auto", my: "20px" }}>
        
        <Typography component="h3" variant="h3" sx={{ mb: "10px", fontSize:"30px" }}>
          Change Your Password:
        </Typography>

        <Stack spacing={2}>
          <Paper elevation={24}>
            <TextField
              label="your password"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={formik.values.password }
              onChange={formik.handleChange}
              focused
            />
          </Paper>

          <Paper elevation={24}>
            <TextField
              label="your new password"
              variant="outlined"
              sx={{ width: "100%"}}
              name="newPassword"
              type="password"
              value={formik.values.newPassword }
              onChange={formik.handleChange}
              focused
            />
          </Paper>
          
         
          <Button variant="contained" color="primary" type='submit'  >
            Change  Password
          </Button>
        </Stack>
      </Box>
     </form>
    </>
  )
}
