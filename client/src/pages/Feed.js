import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { deletePost } from "../api/posts";
import { viewOwnProfile } from "../api/users";


function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
       
  //       console.log("API response:", data);

  //       // make sure it's always an array
  //       if (Array.isArray(data)) {
  //         setPosts(data);
  //       } else {
  //         console.error("Expected array but got:", data);
  //         setPosts([]);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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

        {/* SHOWS CONTENT */ }
        {/*Loops through posts and shows all the posts */ }

        {/* {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded-xl shadow">

            <div className="flex items-center gap-3 mb-2">
              <img
                src={post.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              /> */}
                
              {/* Shows the username of the post creator */}
              {/* <span className="font-semibold">
                {post.authorName  || "Anonymous"}
              </span>
            </div> */}

            {/* Post title  */}
            {/* <h2 className="font-bold text-lg mb-1">
              {post.title}
            </h2> */}

            {/* content of the post */}
            {/* <p className="text-gray-700">
                {post.content}
            </p> */}

          {/* </div> */}
        
        {/* ))} */}

      </div>
    </div>
  );
}

export default Feed;