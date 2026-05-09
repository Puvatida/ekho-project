import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { viewOwnProfile } from "../api/users";
import { createPost } from "../api/posts";
import { getAllCommunities, getCommunity } from "../api/community";

const CreatePost = () => {
  // State variables for post data
  const [title, setTitle] = useState(""); // post title
  const [content, setContent] = useState(""); // post content
  const [tags, setTags] = useState(""); // comma-separated tags
  const [community, setCommunity] = useState(""); // selected community ID
  const [allCommunities, setAllCommunities] = useState([]); // list of all communities
  const [error, setError] = useState(""); // error messages
  const [loading, setLoading] = useState(true); // loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // user auth state

  const navigate = useNavigate(); // for navigation

  // Check if user is logged in
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        await viewOwnProfile(); // throws error if not logged in
        setIsAuthenticated(true); // user is authenticated
        setLoading(false); // stop loading
      } catch (err) {
        setIsAuthenticated(false); // user not authenticated
        setLoading(false); // stop loading
        navigate("/login"); // redirect to login
      }
    }
    checkLoginStatus();
  }, [navigate]);

  // Fetch all communities for dropdown
  useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await getAllCommunities(); // fetch communities from API
        if (Array.isArray(res.data)) {
          setAllCommunities(res.data); // store communities in state
        } else {
          console.error("Unexpected communities format:", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch communities:", err); // log error
      }
    }
    fetchCommunities();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setError(""); // reset error

    // Validate title and content
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required."); // show error
      return;
    }

    // Validate selected community
    if (community) {
      try {
        await getCommunity(community); // throws if not found
      } catch (err) {
        setError("Selected community does not exist."); // show error
        return;
      }
    }

    // Prepare post data
    const postData = {
      title,
      content,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [], // split tags
      community: community || null, // set null if no community selected
    };

    try {
      const response = await createPost(postData); // call API to create post
      if (response.data.post) {
        // reset form fields
        setTitle("");
        setContent("");
        setTags("");
        setCommunity("");
        setError(""); // clear error
        navigate("/feed"); // redirect to feed
      }
    } catch (err) {
      console.error("Error creating post:", err); // log error
      setError("Failed to create post. Please try again."); // show error
    }
  };

  // Show loading state
  if (loading) return <div>Loading...</div>;

  // Show not logged in state
  if (!isAuthenticated)
    return <div>You are not logged in. Redirecting to login...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>

      {/* Show error if exists */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Post creation form */}
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title} // bind state
            onChange={(e) => setTitle(e.target.value)} // update state
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Content textarea */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content} // bind state
            onChange={(e) => setContent(e.target.value)} // update state
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter post content"
            required
          />
        </div>

        {/* Tags input */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags} // bind state
            onChange={(e) => setTags(e.target.value)} // update state
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter post tags"
          />
        </div>

        {/* Community dropdown */}
        <div className="mb-4">
          <label htmlFor="community" className="block text-sm font-medium text-gray-700">
            Community (optional)
          </label>
          <select
            id="community"
            value={community} // bind state
            onChange={(e) => setCommunity(e.target.value)} // update state
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">-- Select Community --</option>
            {allCommunities.length > 0
              ? allCommunities.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title} {/* show community title */}
                  </option>
                ))
              : <option disabled>Loading communities...</option>}
          </select>
        </div>

        {/* Submit button */}
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