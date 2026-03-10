import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";
import AdminPage from "./pages/AdminPage";
import AdminView from "./pages/AdminView";
import AdminEdit from "./pages/AdminEdit";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<FormPage />} />

        <Route path="/preview" element={<PreviewPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/admin/view/:id" element={<AdminView />} />

        <Route path="/admin/edit/:id" element={<AdminEdit />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
