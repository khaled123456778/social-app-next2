"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie, getCookies, setCookie } from 'cookies-next/client';
import { getUserData } from '@/app/lib/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/app/lib/store';
import { Store } from '@reduxjs/toolkit';
import { tokenReducer } from '../../lib/userSlice';
import { getCookie } from 'cookies-next';


const pages: string[] = [];

const settings = [
  { 
    text: "Profile", link: "/profile",
 
   },

  {
     text: "Register", link: "/register" 

  },

  {
     text: "Logout", link: "/" ,
     onclick:()=>{
      let router =useRouter()
      router.push("/")
      deleteCookie("token")
     }
    },
];

export default function Navbar() {
   const dispatch = useDispatch< typeof store.dispatch>();

  let userData = useSelector((state:ReturnType< typeof store.getState>)=>{
    // console.log(state.tokenReducer.userData);
    
    return state.tokenReducer.userData


   })

  React.useEffect(() => {
      dispatch(getUserData())
  
  
  }, [])
  
  let currentPath =usePathname()
  let router =useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{overflow:"hidden"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo for desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SocialApp
          </Typography>

          {/* Menu icon for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={page === "Home" ? "/" : `/${page.toLowerCase()}`} passHref legacyBehavior>
                    <Typography textAlign="center" component="a" sx={{ textDecoration: 'none', color: 'inherit' }}>
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SocialApp
          </Typography>

          {/* Links for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} href={page === "Home" ? "/" : `/${page.toLowerCase()}`} passHref legacyBehavior>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {/* User Avatar Menu */}
       {currentPath==="/"  ?  <Link href={'/register'} style={{textDecoration:"none",color:"inherit",fontSize:"20px"}}>Register</Link> :""}
       {currentPath==="/home"  ?   <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0 }}>
                <Avatar alt="User" src={userData?.photo}/>
                {/* {userData?.photo?setCookie("img",userData?.photo):getCookie("img")} */}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
            {settings.map((setting) => (
  <Link href={setting.link} key={setting.text} style={{ textDecoration: 'none', color: 'inherit' }}>
    <MenuItem onClick={()=>{
      handleCloseUserMenu();
      setting.onclick && setting.onclick();
    }}>
      <Typography textAlign="center">{setting.text}</Typography>
    </MenuItem>
  </Link>
))}
            </Menu>
          </Box>:""}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
