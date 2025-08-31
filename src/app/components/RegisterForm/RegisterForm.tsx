"use client";
import React from 'react';
import { setCookie, getCookie, deleteCookie, getCookies } from 'cookies-next';

import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const router =useRouter()
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: ""
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      axios.post("https://linked-posts.routemisr.com/users/signup", values)
        .then((data) => {
          console.log(data);
          toast.success(data.data.message)
          router.push("/")

          
        })
        .catch((error) => {
          console.log(error);
          
          toast.error(error.response.data.error)
        });
    }
  });

  return (
    <Container>
      <Paper sx={{ pt: 9, px: 3, pb: 4 }}>
        <Typography component="h1" variant="h3" sx={{ textAlign: "center" }}>
          Register Now
        </Typography>
        <Divider sx={{ my: 4 }} />
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Name"
            variant="outlined"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Repassword"
            variant="outlined"
            name="rePassword"
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
          />

          <Grid container spacing={2}>
            <Grid size={8}>
              <TextField
                sx={{ my: 1, width: "100%" }}
                variant="outlined"
                name="dateOfBirth"
                type="date"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid size={4} >
              <Select
                fullWidth
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                displayEmpty
                sx={{mt:1}}
              >
                <MenuItem value=""><em>Select Gender</em></MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Button
            sx={{ my: 2, width: "100%" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
