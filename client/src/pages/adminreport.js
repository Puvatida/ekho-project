import { useEffect, useState } from "react";
import { deletePost } from "../api/posts";

function AdminReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/reports", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setReports(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  }, []);

  async function handleDeletePost(postId) {
    const confirmed = window.confirm("Delete this reported post?");
    if (!confirmed) return;

    try {
      await deletePost(postId);

      setReports((oldReports) =>
        oldReports.filter((report) => report.targetId !== postId)
      );
    } catch (err) {
      alert(err.response?.data?.error || "Could not delete post");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Admin Reports
      </h1>

      <div className="mx-auto max-w-3xl space-y-4">
        {reports.length === 0 && (
          <p className="text-center text-gray-500">
            No reports yet...
          </p>
        )}

        {reports.map((report) => (
          <div
            key={report._id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">Reported by</p>
            <p className="mb-3 font-semibold">
              {report.reportByName || "Unknown user"}
            </p>

            <p className="text-sm text-gray-500">Target type</p>
            <p className="mb-3">{report.targetType}</p>

            <p className="text-sm text-gray-500">Target ID</p>
            <p className="mb-3 break-all">{report.targetId}</p>

            <p className="text-sm text-gray-500">Reason</p>
            <p className="mb-4">{report.reasonOfReport}</p>

            {report.targetType === "post" && (
              <button
                onClick={() => handleDeletePost(report.targetId)}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
              >
                Delete Reported Post
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReports;