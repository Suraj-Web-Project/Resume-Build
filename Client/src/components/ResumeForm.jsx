import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ResumeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/resume/create", formData);

    navigate("/preview", { state: res.data });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Resume Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="education"
          placeholder="Education"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <textarea
          name="experience"
          placeholder="Experience"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <textarea
          name="skills"
          placeholder="Skills"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Generate Resume
        </button>
      </form>
    </div>
  );
}

export default ResumeForm;
