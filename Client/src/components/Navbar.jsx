import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-lg">Resume Builder</h1>

        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Form
          </Link>

          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
