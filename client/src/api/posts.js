import API from "./api"; // import axios instance

// import { post } from "../../../api/routes/posts";

//create a post
//backend titles, content, tags and community
export const createPost = (data) => API.post("/posts/", data);

//get full feed
export const getFeed = () => API.get("/posts/");

//get search  by title 
export const searchPost = (title ) => API.get("/posts/search", {params: {title}} );

//update post (post owner) w/postID
export const updatePost = (postId, data) => API.patch(`/posts/${postId}`, data);

//delete post by postId
export const deletePost = (postId) => API.delete(`/posts/${postId}`);

// Get posts for a specific user
export const getUserPosts = (userId) => {
  return API.get(`/posts/user/${userId}`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching user posts:', error);
      throw error;
    });
};

// Get posts for a specific community
export const getCommunityPosts = (communityId) => {
  return API.get(`/posts/community/${communityId}`);
};
