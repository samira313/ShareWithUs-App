import { FaBars, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./Header.css";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Get the token from localStorage to check if the user is logged in
  const token = localStorage.getItem("token");
  // Convert the token to a boolean: if token exists, user is logged in; otherwise, not logged in
  const isLoggedIn = !!token;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, user is not logged in, so redirect to auth page

      return;
    }
    // Fetch user profile data if logged in
    fetch("http://localhost:3000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include credentials for CORS requests
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Optionally redirect to auth page if fetching fails
      });
  }, []);

  return (
    <>
      <div className="header">
        <div className="left-section">
          <FaBars
            className="menu-icon"
            onClick={() => setIsSidebarOpen(true)}
          />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <button className="logo-button" onClick={() => navigate("/")}>
            <img src={logo} alt="Company Logo" className="logo" />
          </button>
        </div>
        <div className="center-section">
          <div className="search-bar-inline">
            <SearchBar />
          </div>
        </div>
        <div className="header-right">
          {isLoggedIn ? (
            <>
              <p onClick={() => navigate("/profile")} className="user-name">
                {user?.firstName || "My Profile"}
              </p>
              <LogoutButton />
            </>
          ) : (
            <FaUserCircle
              className="header-icon"
              onClick={() => navigate("/auth")}
            />
          )}
        </div>
      </div>
      <div className="search-bar-wrapper">
        <SearchBar />
      </div>
    </>
  );
};

export default Header;
