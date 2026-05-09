import API from './api'; // Make sure API is set up correctly for axios calls

export const createComment = async ({ postId, content }) => {
  try {
    const response = await API.post("/comments", { postId, content }, {
    });
    return response
  } catch (error) {
    console.error("Error while creating comment:", error.response?.data); // Log the error
    throw error; // Throw the error to handle it on the frontend
  }
};