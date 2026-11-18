
import { useEffect, useState } from "react";
import axios from "axios";
import {
  UserCircle,
  Phone,
  CalendarDays,
  LoaderCircle
} from "lucide-react";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
console.log("Profile response:", response.data);
setUser(response.data.user);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <LoaderCircle className="spin" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-error">
        {error || "User not found"}
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-heading">
        <h1>My Profile</h1>
        <p>Manage your AlgoSimplified account.</p>
      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          <UserCircle size={65} />
        </div>

        <h2>{user.name}</h2>
        <p className="profile-subtitle">
          AlgoSimplified Member
        </p>

        <div className="profile-info">

          <div className="profile-info-item">
            <div className="profile-info-icon">
              <UserCircle size={20} />
            </div>

            <div>
              <span>Full Name</span>
              <h3>{user.name}</h3>
            </div>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-icon">
              <Phone size={20} />
            </div>

            <div>
              <span>Mobile Number</span>
              <h3>{user.mobile}</h3>
            </div>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-icon">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>Member Since</span>
              <h3>
                {new Date(user.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }
                )}
              </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
