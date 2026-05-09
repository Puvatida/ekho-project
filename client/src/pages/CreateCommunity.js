import React, { useState } from "react";
import API from "../api/api"; 
import { useNavigate } from "react-router-dom";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name) {
      setError("Community name is required");
      return;
    }

    try {
      const res = await API.post("/communities", { 
        title: name, 
        description 
    });

      // Show success message
      setSuccess("Community created successfully!");

      // Clear input fields
      setName("");
      setDescription("");

      // Redirect after 2 seconds
      setTimeout(() => {
        // Replace with the correct feed route for this community
        navigate(`/community/${res.data._id}/feed`);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Create a New Community</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Community Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Community
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunity;