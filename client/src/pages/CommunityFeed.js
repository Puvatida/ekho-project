import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getCommunity, getCommunityPosts } from "../api/community";
import { deletePost } from "../api/posts";
import { viewOwnProfile } from "../api/users";

const CommunityFeed = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCommunityData() {
      try {
        // Fetch community details
        const communityRes = await getCommunity(communityId);
        setCommunity(communityRes.data);

        // Fetch community posts
        const postsRes = await getCommunityPosts(communityId);
        setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);

        // Fetch current user
        const userRes = await viewOwnProfile();
        setCurrentUser(userRes.data);
      } catch (err) {
        console.error("Error fetching community data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCommunityData();
  }, [communityId]);

  async function handleDeletePost(postId) {
    const confirmed = window.confirm("You sure you want to delete this post?");
    if (!confirmed) return;

    try {
      await deletePost(postId);
      setPosts((oldPosts) => oldPosts.filter((post) => post._id !== postId));
    } catch (err) {
      alert(err.response?.data.error || "You can't delete this post!");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!community) return <div>Community not found</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Community Header */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{community.title}</h1>
        {community.descsription && (
          <p className="text-gray-700">{community.descsription}</p>
        )}
      </div>

      {/* Posts */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet in this community.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUser={currentUser}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;