
import { configureStore } from '@reduxjs/toolkit';
import { tokenReducer } from './userSlice';
import { postReduer } from './postSlice';
import { commentResucer } from './CommentSlice';

export let store = configureStore({

    reducer:{
        tokenReducer,
        postReduer,
        commentResucer
    }
})
