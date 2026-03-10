import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/admin/resume/${id}`);

        setFormData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResume();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/admin/resume/${id}`, formData);

      alert("Resume Updated");

      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Resume</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update Resume
        </button>
      </form>
    </div>
  );
}

export default AdminEdit;
