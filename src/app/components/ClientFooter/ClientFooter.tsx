"use client"
import React from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt:"20px",
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        py: 2,
//    position:'fixed',
//    bottom:0,
//    left:0,

        textAlign: 'center',
      }}
    >
      <Typography variant="body1" gutterBottom>
        تابعنا على وسائل التواصل
      </Typography>
      <Box>
        <IconButton color="inherit" aria-label="Facebook">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Twitter">
          <TwitterIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Instagram">
          <InstagramIcon />
        </IconButton>
      </Box>
      <Typography variant="caption" display="block" mt={1}>
        &copy; {new Date().getFullYear()} Social App. All rights reseved
      </Typography>
    </Box>
  );
};

export default Footer;
