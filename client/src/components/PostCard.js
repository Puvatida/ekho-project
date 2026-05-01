//reuseable Postcard function 
function PostCard({post}){
    return  (
    <div className="block w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-3">
        <p className="text-sm text-gray-500">
          @{post.authorName || "anonymous"}
        </p>
      </div>

      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        {post.title}
      </h2>

      <p className="mb-6 text-gray-700">
        {post.content}
      </p>

      {post.tags?.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : "Just now"}
        </p>

        <button className="inline-flex items-center rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          comment
        </button>
      </div>
    </div>
  );

}
export default PostCard; //to be reuse