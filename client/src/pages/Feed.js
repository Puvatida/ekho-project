import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { deletePost } from "../api/posts";
import { viewOwnProfile } from "../api/users";


function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9000/api/posts") //fetches posts 
      .then((res) => res.json())
      .then((data) =>  
        setPosts(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));

      viewOwnProfile()
      .then((res) => setCurrentUser(res.data)).catch(() => setCurrentUser(null));
  
  }, []);

  async function handleDeletePost(postId){
    const confirmed = window.confirm("You sure you want to Delete?");

    if(!confirmed) 
      return;

    try{
       await deletePost(postId);
       
       setPosts((oldPost) => oldPost.filter((post) => post._id !== postId));
    }
    catch (err){
      alert(err.response?.data.error || "You can't delete this post!")
    }
   
  }
       

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ekho Feed
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* No posts exist... */}
        {posts.length === 0 && (
          <p className="text-center text-gray-500">
            No posts yet...
          </p>
        )}

        {/*connect postcard component to show all posts on feed.  */}
        {posts.map((post) => (
          <PostCard 
          key={post._id} 
          post={post} 
          currentUser={currentUser}
          onDelete={handleDeletePost}
          />))}

        {/*Floating button */}
        <button
        onClick={() => navigate("/post")}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-black text-3xl text-white shadow-lg hover:bg-gray-800">
          +
        </button>

      </div>
    </div>
  );
}

export default Feed;