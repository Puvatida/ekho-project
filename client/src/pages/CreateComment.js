import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment, getPostComment, deleteComment, reportComment } from "../api/comment";
import { viewOwnProfile } from "../api/users";

const CreateComment = () => {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchComments() {
      try {
        const resComment = await getPostComment(postId);
        setComments(Array.isArray(resComment.data) ? resComment.data : []);
      } catch (err) {
        console.log("Couldn't load comments", err);
      }
    }

    async function checkLoginStatus() {
      try {
        await viewOwnProfile();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
    checkLoginStatus();
  }, [postId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Comment content is required.");
      return;
    }
    try {
      const response = await createComment({ content, postId });
      setComments((old) => [response.data.comment, ...old]);
      setContent("");
      setError("");
    } catch (err) {
      console.error("Error while adding comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete comment.");
    }
  };

  const handleReport = async (commentId) => {
    const reason = window.prompt("Why are you reporting this comment?", "Inappropriate content");
    if (!reason) return;

    try {
      await reportComment(commentId, reason);
      alert("Comment reported successfully.");
    } catch (err) {
      console.error("Report failed:", err);
      alert("Failed to report comment.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>You are not logged in. Redirecting to login...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mt-6 border-t pt-4">
        <h3 className="mb-3 text-lg font-semibold">Previous Comments</h3>
        <div className="flex flex-col gap-4">
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">@{comment.authorName || "anonymous"}</h3>
                </div>
                <p className="text-xs text-gray-400">
                  {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}
                </p>
                <p className="mt-2 text-gray-700">{comment.content}</p>

                <div className="flex gap-3 mt-2">
                  <button onClick={() => handleReport(comment._id)} className="hover:text-yellow-600">Report</button>
                  <button onClick={() => handleDelete(comment._id)} className="hover:text-red-600">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Add comment</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Write your comment here"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;