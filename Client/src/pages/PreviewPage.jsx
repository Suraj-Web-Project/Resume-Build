import { useLocation } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";

function PreviewPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ResumePreview resumeData={data} />
    </div>
  );
}

export default PreviewPage;
