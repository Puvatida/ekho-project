import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { viewOwnProfile, deleteOwnProfile } from "../api/users";
import { getUserPosts } from "../api/posts";

import Button from "../components/Button";
import PostCard from "../components/PostCard";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Load profile & posts
  useEffect(() => {
    async function viewProfile() {
      try {
        const res = await viewOwnProfile();
        setUser(res.data);

        const userId = res.data.user._id || res.data.user.id;

        if (userId) {
          try {
            const userPosts = await getUserPosts(userId);
            setPosts(userPosts || []);
          } catch (postError) {
            console.error("Failed to load posts:", postError);
            setPosts([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/login");
      }
    }

    viewProfile();
  }, [navigate]);

  async function deleteOwnAccount() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account?"
    );

    if (confirmed) {
      try {
        await deleteOwnProfile();
        navigate("/");
      } catch (err) {
        console.error("Delete account failed:", err);
      }
    }
  }

  if (!user) {
    return <p className="p-6">Loading Profile...</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile icon */}
          <div className="relative w-16 h-16 overflow-hidden bg-neutral-secondary-medium rounded-full">
            <svg
              className="absolute w-20 h-20 text-body-subtle -left-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <h1 className="text-2xl font-bold">My Profile</h1>

          <div className="w-full space-y-2 text-left">
            <p>
              <span className="font-semibold">Email: </span> {user.user.email}
            </p>
            <p>
              <span className="font-semibold">Username: </span>{" "}
              {user.user.usernameGenerated}
            </p>
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <Button onClick={deleteOwnAccount}>Delete Account</Button>
          </div>

          {/* Posts Section */}
          <div className="mt-6 w-full">
            <h2 className="text-xl font-bold mb-4">Your Posts</h2>
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p>You haven't created any posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;