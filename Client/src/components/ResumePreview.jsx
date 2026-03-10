import { useRef } from "react";

function ResumePreview({ resumeData }) {
  const resumeRef = useRef();

  const downloadPDF = () => {
    // password format
    const password = `${resumeData.name}-${resumeData.dob}`;

    // show password to user
    alert(`Resume Password: ${password}`);

    // call backend API to download protected PDF
    window.location.href = `http://localhost:5000/api/resume/download/${resumeData._id}`;
  };

  const printResume = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded">
      {/* RESUME CONTENT */}

      <div ref={resumeRef}>
        <h1 className="text-3xl font-bold">{resumeData.name}</h1>

        <div className="text-gray-600 mt-1">
          <p>{resumeData.email}</p>
          <p>{resumeData.phone}</p>
        </div>

        <hr className="my-4" />

        <h3 className="mt-4 text-xl font-semibold">Education</h3>
        <p className="text-gray-700">{resumeData.education}</p>

        <h3 className="mt-6 text-xl font-semibold">Experience</h3>
        <p className="text-gray-700">{resumeData.experience}</p>

        <h3 className="mt-6 text-xl font-semibold">Skills</h3>
        <p className="text-gray-700">{resumeData.skills}</p>
      </div>

      {/* ACTION BUTTONS */}

      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Resume
        </button>

        <button
          onClick={printResume}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Print Resume
        </button>
      </div>
    </div>
  );
}

export default ResumePreview;
