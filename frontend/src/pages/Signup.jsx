
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/users/signup`,
      {
        name: formData.name,
        mobile: formData.mobile,
        password: formData.password
      }
    );

    alert(response.data.message);
    navigate("/login");

  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          Algo<span>Simplified</span>
        </Link>

        <div className="auth-heading">
          <h1>Create your account</h1>
          <p>Start your coding journey with AlgoSimplified.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Full Name</label>
            <div className="auth-input">
              <User size={17} />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

         <div className="auth-field">
  <label>Mobile Number</label>
  <div className="auth-input">
    <User size={17} />
    <input
      type="tel"
      name="mobile"
      placeholder="Enter your mobile number"
      value={formData.mobile || ""}
      onChange={handleChange}
      required
    />
  </div>
</div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input">
              <Lock size={17} />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <div className="auth-input">
              <Lock size={17} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit">
            Create Account
            <ArrowRight size={17} />
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
