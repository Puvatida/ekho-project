import { useEffect, useState } from "react";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/posts") //fetches posts 
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);

        // make sure it's always an array
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected array but got:", data);
          setPosts([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

        {/* SHOWS CONTENT */ }
        {/*Loops through posts and shows all the posts */ }
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded-xl shadow">

            <div className="flex items-center gap-3 mb-2">
              <img
                src={post.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
                
              {/* Shows the username of the post creator */}
              <span className="font-semibold">
                {post.authorName  || "Anonymous"}
              </span>
            </div>

            {/* Post title  */}
            <h2 className="font-bold text-lg mb-1">
              {post.title}
            </h2>

            {/* content of the post */}
            <p className="text-gray-700">
                {post.content}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Feed;