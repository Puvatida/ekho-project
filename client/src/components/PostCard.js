import React from "react";
import { reportPost } from "../api/report";

function PostCard({ post, currentUser, onDelete }) {
  async function handleReportPost() {
    const reasonOfReport = prompt("Why are you reporting this post?");

    if (!reasonOfReport) return;

    try {
      await reportPost(post._id, reasonOfReport);
      alert("Report submitted");
    } catch (err) {
      alert(err.response?.data?.error || "Could not report post");
    }
  }

  const isOwner =
    currentUser?._id === post.createdBy ||
    currentUser?._id === post.createdBy?._id;

  return (
    <div className="block w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-3">
        <p className="text-sm text-gray-500">
          @{post.authorName || "anonymous"}
        </p>
      </div>

      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        {post.title}
      </h2>

      <p className="mb-6 text-gray-700">{post.content}</p>

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

      <p className="mb-4 text-xs text-gray-400">
        {post.createdAt
          ? new Date(post.createdAt).toLocaleString()
          : "Just now"}
      </p>

      <div className="flex items-center gap-2">
        <button className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          Comment
        </button>

        <button
          type="button"
          onClick={handleReportPost}
          className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
        >
          Report
        </button>

        {isOwner && (
          <button
            type="button"
            onClick={() => onDelete(post._id)}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCard;