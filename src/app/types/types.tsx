export type userToken={
    token:null|string
      userData:null|UserI
      userPosts:null
}
export type FormikValues={
      email: string,
      password: string,
}

export type postState={
  isLoding:boolean,
    isError:boolean,
    posts:null|Post[],
  singlePost:null|Post,
  showComments:boolean
}
// نوع المستخدم
export type User = {
  _id: string;
  name: string;
  photo: string;
};

// نوع التعليق
// types/types.ts
export type Comment = {
  _id: string;
  content: string;
  createdAt: string;
  commentCreator: {
    name: string;
    photo?: string;
  };
};


// نوع المنشور
export type Post = {
  _id: string;
  body: string;
  image: string;
  createdAt: string;
  user: User;
  comments: Comment[];
};

// مصفوفة من المنشورات
export type Posts = Post[];

export type idParams={
  id:string
}
   
export type Props = {
  params: {
    id: string;
  };
};

interface UserI {
  _id: string;
  createdAt: string; // ISO date string
  dateOfBirth: string; // ISO date string
  email: string;
  gender: 'male' | 'female'; // قيدناها بقيم محتملة
  name: string;
  photo: string;
}

export type NewPassword={
  message
: 
string
token
: 
string
}

// types/Post.ts
export interface PostUser {
  _id: string;
  name: string;
  photo: string;
}

export interface UserPost {
  _id: string;
  id: string;
  image: string;
  createdAt: string;
  user: PostUser;
}
