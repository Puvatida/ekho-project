import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment } from "../api/comment"; // Ensure this file is set up correctly
import { viewOwnProfile } from "../api/users"; // To check if the user is logged in

const CreateComment = () => {
  const { postId } = useParams(); // Get the postId from the URL parameters
  const [content, setContent] = useState(""); // Store the content of the comment
  const [error, setError] = useState(""); // Error message if comment creation fails
  const [loading, setLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if user is authenticated
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
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

    checkLoginStatus();
  }, [navigate]);

  // If still loading or not authenticated, prevent showing the form
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not logged in. Redirecting to login...</div>;
  }

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
      if (response.data && response.data.comment) {
        setContent(""); // Clear content after successful submission
        setError(""); // Clear any previous error
        navigate(`/post/${postId}`); // Redirect back to the post page after comment is added
      } else {
        setError("Failed to add comment. Please try again.");
      }
    } catch (err) {
      console.error("Error while adding comment:", err); // Log error for debugging
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Add a Comment</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Comment Content
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
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;