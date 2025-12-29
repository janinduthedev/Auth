import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from backend
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // If no token, go back to login page
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Call the private API with the token
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        });
        setUser(res.data.user); // Save user to state
      } catch (error) {
        // If something goes wrong, logout the user
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Show this while waiting for data
  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 p-4 text-white flex justify-between">
        <h1 className="font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </nav>

      <div className="flex justify-center mt-20">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-xl font-bold">Hello, {user.name}!</h2>
          <p className="text-gray-600">You are successfully logged in.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
