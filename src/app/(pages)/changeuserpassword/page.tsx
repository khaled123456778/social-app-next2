"use client"
import { store } from '@/app/lib/store';
import { ChangeUserPassword as changeUserPasswordAction } from '@/app/lib/userSlice';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { setCookie } from 'cookies-next/client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function ChangePasswordForm() {
  type ChangePassword = {
    password: string;
    newPassword: string;
  };

  const initialValues: ChangePassword = {
    password: "",
    newPassword: ""
  };

  const router = useRouter();
  const dispatch = useDispatch<typeof store.dispatch>();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(changeUserPasswordAction(values))
        .then((res: any) => {
          console.log(res);
          if (res?.payload?.token) {
            setCookie("newToken", res.payload.token);
          }
          if (res?.payload?.message === "success") {
            toast.success("Your password was updated successfully");
            router.push("/");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong");
        });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit  }>
      <Box sx={{ pt: "100px", width: "50%", m: "auto", my: "20px",  height:"100vh",marginTop:"100px" }}>
        <Typography component="h3" variant="h3" sx={{ mb: "10px", fontSize:"30px" }}>
          Change Your Password:
        </Typography>

        <Stack spacing={2}>
          <Paper elevation={24}>
            <TextField
              label="Current password"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              focused
            />
          </Paper>

          <Paper elevation={24}>
            <TextField
              label="New password"
              variant="outlined"
              fullWidth
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              focused
            />
          </Paper>

          <Button variant="contained" color="primary" type="submit">
            Change Password
          </Button>
        </Stack>
      </Box>
    </form>
  );
}
