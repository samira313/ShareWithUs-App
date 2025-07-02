import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./ProfilePage.css";
import ItemCard from "../components/ItemCard";
import EditProfileForm from "../components/EditProfileForm";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);
  const [showBorrowed, setShowBorrowed] = useState(false);
  const [showOwned, setShowOwned] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUserInfo(res.data);
        setBorrowedItems(res.data.borrowedItems || []);
        setOwnedItems(res.data.ownedItems || []);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!userInfo) {
    return <Loader />;
  }

  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="avatar"
            className="avatar"
          />
          <p>
            <strong>Email</strong>: {userInfo.email}
          </p>
          <p>
            <strong> Name:</strong> {userInfo.firstName} {userInfo.lastName}
          </p>
          <p>
            <strong>Phone</strong>: {userInfo.phone}
          </p>
          <p>
            <strong>City</strong>: {userInfo.city}
          </p>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="edit-profile-button"
            >
              Edit Profile
            </button>
          )}
          {editing && (
            <EditProfileForm
              user={userInfo}
              onSuccess={(updatedUser) => {
                setUserInfo(updatedUser);
                setEditing(false);
              }}
            />
          )}
        </div>

        <div className="items-section">
          {/* Borrowed Items */}
          <div className="items-box">
            <div
              className="items-header"
              onClick={() => setShowBorrowed((prev) => !prev)}
            >
              <h3>Borrowed Items</h3>
              <span className={`arrow ${showBorrowed ? "rotate" : ""}`}>
                {showBorrowed ? "▼" : "▶"}
              </span>
            </div>
            {showBorrowed && (
              <div className="items-grid">
                {borrowedItems.length > 0 ? (
                  borrowedItems.map((item) => (
                    <ItemCard
                      key={item._id}
                      item={item}
                      onClick={() => handleItemClick(item._id)}
                    />
                  ))
                ) : (
                  <p>No borrowed items.</p>
                )}
              </div>
            )}
          </div>

          {/* Owned Items */}
          <div className="items-box">
            <div
              className="items-header"
              onClick={() => setShowOwned((prev) => !prev)}
            >
              <h3>Owned Items</h3>
              <span className={`arrow ${showOwned ? "rotate" : ""}`}>
                {showOwned ? "▼" : "▶"}
              </span>
            </div>
            {showOwned && (
              <div className="items-grid">
                {ownedItems.length > 0 ? (
                  ownedItems.map((item) => (
                    <ItemCard
                      key={item._id}
                      item={item}
                      onClick={() => handleItemClick(item._id)}
                    />
                  ))
                ) : (
                  <p>No owned items.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
