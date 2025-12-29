import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Redirect to login if token is missing (Route Protection)
    if (!token) {
      navigate("/login");
    } else {
      // Placeholder for user data (Can be decoded from JWT later)
      setUser({ name: "MERN Stack User" });
    }
  }, [navigate]);

  // Function to handle user logout
  const handleLogout = () => {
    // Remove token from storage and redirect to login page
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-indigo-600 p-4 text-white shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold">My Auth App</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
        >
          Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-sm w-full border border-gray-200">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-indigo-600 font-bold uppercase">
              {user?.name.charAt(0)}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-500 mt-2">
            You have successfully accessed your secure dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
