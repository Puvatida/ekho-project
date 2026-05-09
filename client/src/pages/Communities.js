import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCommunities } from "../api/community";

const AllCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*fetch all communities*/
  useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await getAllCommunities();
        setCommunities(res.data);
      } catch (err) {
        console.error("Error fetching communities:", err);
        setError("Failed to load communities.");
      } finally {
        setLoading(false);
      }
    }

    fetchCommunities();
  }, []);

  if (loading) return <div>Loading communities...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (communities.length === 0) return <div>No communities found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">All Communities</h2>
      <ul className="space-y-4">
        {communities.map((community) => (
          <li key={community._id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100">
            <Link
              to={`/community/${community._id}/feed`}
              className="text-blue-600 hover:underline font-medium"
            >
              {community.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCommunities;