import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminPage() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("/admin/resumes");
        setResumes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResumes();
  }, []);

  const deleteResume = async (id) => {
    try {
      await api.delete(`/admin/resume/${id}`);

      const res = await api.get("/admin/resumes");
      setResumes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((r) => (
          <div key={r._id} className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold text-lg">{r.name}</h2>

            <p className="text-gray-600">{r.email}</p>

            <div className="flex gap-2 mt-3">
              <Link
                to={`/admin/view/${r._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                View
              </Link>

              <Link
                to={`/admin/edit/${r._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteResume(r._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
