import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment, getPostComment } from "../api/comment"; // Ensure this file is set up correctly
import { viewOwnProfile } from "../api/users"; // To check if the user is logged in

const CreateComment = () => {
  const { postId } = useParams(); // Get the postId from the URL parameters
  const [content, setContent] = useState(""); // Store the content of the comment
  const [comments, setComments] = useState([]); // Store the comments of the comment to show all 
  const [error, setError] = useState(""); // Error message if comment creation fails
  const [loading, setLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if user is authenticated
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    async function fetchComments(){
      try{
        const resComment = await getPostComment(postId);
        setComments(Array.isArray(resComment.data)? resComment.data : []);
      }
      catch(err){
        console.log("Couldn't load comments" , err);
  
      }
    }

    async function checkLoginStatus() {
      try {
        const res = await viewOwnProfile(); // Checks login status
        setIsAuthenticated(true); // User is authenticated
        setLoading(false); // Stop loading when the user is authenticated
      } catch (err) {
        setIsAuthenticated(false); // User is not authenticated
        setLoading(false); // Stop loading
        navigate("/login"); // Redirect to login page if not logged in
      }
    }

    fetchComments();
    checkLoginStatus();
  }, [postId,navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Comment content is required.");
      return;
    }

    const commentData = {
      content,
      postId, // Pass the postId to associate the comment with the post
    };

    try {

      const response = await createComment(commentData); // Call the createComment API

      const newComment = response.data.comment || response.data; //get full comment data for that post

      if (response.data && response.data.comment) {

        setComments((oldComments) => [newComment, ...oldComments]);
        setContent(""); // Clear content after successful submission
        setError(""); // Clear any previous error
        // navigate(`/post/${postId}`); // Redirect back to the post page after comment is added
      } else {
        setError("Failed to add comment. Please try again.");
      }
    } catch (err) {
      console.error("Error while adding comment:", err); // Log error for debugging
      setError("Failed to add comment. Please try again.");
    }
  };

    // If still loading or not authenticated, prevent showing the form
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not logged in. Redirecting to login...</div>;
  }

  return (

    
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}


       {/* display the comments*/}
      <div className="mt6 border-t pt-4">
        <h3 className="mb-3 text-lg font-semibold">previous comments </h3>

        <div className="flex flex-col gap-4">
          {comments.length === 0 ? (<p>No comments yet.</p>) : (
            comments.map((comment) => 
            (
              <div 
              key={comment._id}
              className="w-full rounded -xl border border-gray-200 bg-gray-50 p-4 shadow-sm">

                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">@{comment.authorName || "anonymous"}</h3>
                </div>

                <p className="text-xs text-gray-400">
                  {comment.createAt ? new Date(comment.createAt).toLocaleString() : ""}
                </p>

                <p className="mt-2 text-gray-700">
                  {comment.content}
                </p>



                <div className="flex gap-3">
                  <button className="hover:text-yellow-600">
                  Report
                  
                </button>
                
                <button className="hover:text-red-600">
                  Delete
                  
                </button>

                </div>
                

                {/* <button
                type="button"
                onClick={handleReportPost}
                className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                >
                  Report
                </button>

                {isOwner && (
                  
                  <button
                  type="button"
                  onClick={() => onDelete(post._id)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                
                )} */}
              </div>
            ))
          
        )}
        </div>
        
      </div> {/*for comments */}




      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Add comment
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Write your comment here"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>
      
    </div>
  );
};

export default CreateComment;