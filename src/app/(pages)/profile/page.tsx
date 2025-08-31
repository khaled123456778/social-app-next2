// components/UserProfile.tsx
"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "next/image"; 

import { getUserData, getUserPosts } from "@/app/lib/userSlice";
import { useEffect } from "react";
import { store } from "@/app/lib/store";
import { UserPost } from "@/app/types/types";


const UserProfile = () => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const { userData, userPosts } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.tokenReducer
  );

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getUserPosts());
  }, [dispatch]);

  if (!userData)
    return <Typography variant="h6">Loading user data...</Typography>;

   return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#eef1f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        pt:"80px"
      }}
    >
      {/* Welcome Message */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
        }}
      >
        👋 Welcome back, {userData.name.split(" ")[0]}!
      </Typography>

      {/* Profile Card */}
      <Paper
        elevation={4}
        sx={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          mb: 5,
        }}
      >
        <Box sx={{ bgcolor: "#1565c0", p: 4, textAlign: "center" }}>
          <Avatar
            src={userData.photo}
            alt={userData.name}
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              border: "4px solid white",
              mb: 2,
            }}
          />
          <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
            {userData.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "white", opacity: 0.85 }}>
            {userData.email}
          </Typography>
        </Box>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Gender
              </Typography>
              <Typography variant="body1">{userData.gender}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Date of Birth
              </Typography>
              <Typography variant="body1">
                {new Date(userData.dateOfBirth).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Account Created
              </Typography>
              <Typography variant="body1">
                {new Date(userData.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Password Changed
              </Typography>
              <Typography variant="body1">
                {new Date(userData.passwordChangedAt).toLocaleString()}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="textSecondary">
                User ID
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: "break-all", color: "#444" }}>
                {userData._id}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      {/* Posts */}
      <Box sx={{ maxWidth: 700, width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#444" }}>
          Your Posts
        </Typography>

        {userPosts && userPosts.length > 0 ? (
          <Grid container spacing={2}>
            {userPosts.map((post: any) => (
              <Grid item xs={12} key={post._id}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 3,
                    boxShadow: 3,
                    backgroundColor: "#fff",
                  }}
                >
                  <Avatar
                    src={post.user.photo}
                    alt={post.user.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {post.user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      {post.body}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: "auto", width: 100, height: 60 }}>
                    <Image
                      src={post.image}
                      alt="post"
                      width={100}
                      height={60}
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            You haven't posted anything yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
