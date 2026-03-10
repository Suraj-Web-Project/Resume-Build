import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function AdminView() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/admin/resume/${id}`);
        setResume(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResume();
  }, [id]);

  if (!resume) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold">{resume.name}</h1>

      <p>{resume.email}</p>
      <p>{resume.phone}</p>

      <h3 className="mt-4 font-semibold">Education</h3>
      <p>{resume.education}</p>

      <h3 className="mt-4 font-semibold">Experience</h3>
      <p>{resume.experience}</p>

      <h3 className="mt-4 font-semibold">Skills</h3>
      <p>{resume.skills}</p>
    </div>
  );
}

export default AdminView;
