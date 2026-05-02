import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { viewOwnProfile } from "../api/users"; 
import { createPost } from "../api/posts"; 

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [community, setCommunity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const res = await viewOwnProfile(); // checks login status
        console.log("User data:", res.data); // debugging
        setIsAuthenticated(true); // user is authenticated
        setLoading(false); // Stop loading when the user is authenticated
      } catch (err) {
        console.log("Not logged in, redirecting to login");
        setLoading(false); // Stop loading before redirecting
        setIsAuthenticated(false); // Ensure the user is marked as not authenticated
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

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const postData = {
      title,
      content,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      community: community.trim() || null,
    };

    try {
      const response = await createPost(postData); // Create post via API
      if (response.data.post) {
        setTitle("");
        setContent("");
        setTags("");
        setCommunity("");
        setError(""); // Clear error on success
        navigate("/feed"); // Redirect to feed after successful post creation
      }
    } catch (err) {
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter post content"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter post tags"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="community" className="block text-sm font-medium text-gray-700">
            Community (optional)
          </label>
          <input
            type="text"
            id="community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter community (optional)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;