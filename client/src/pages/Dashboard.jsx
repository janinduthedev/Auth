import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import the decoder

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        // Decode the token to get user details
        const decoded = jwtDecode(token);
        // In our backend, we put the name in the token payload
        setUserName(decoded.name || "User");
      } catch (error) {
        // If token is invalid, logout the user
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="bg-indigo-600 p-4 text-white shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold">My Auth App</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
        >
          Logout
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-sm w-full border border-gray-200">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-indigo-600 font-bold uppercase">
              {userName.charAt(0)}
            </span>
          </div>
          {/* Displaying the Actual Name from the Token */}
          <h2 className="text-2xl font-bold text-gray-800">
            Hello, {userName}! 👋
          </h2>
          <p className="text-gray-500 mt-2">
            Welcome back to your personalized dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
