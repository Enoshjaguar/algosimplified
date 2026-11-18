
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        mobile: formData.mobile,
        password: formData.password
      }
    );

    // Save JWT token
    localStorage.setItem("token", response.data.token);
    

    // Save user details
    localStorage.setItem("user", JSON.stringify(response.data.user));

    alert("Login successful!");

    navigate("/");

  } catch (error) {
    console.log(error)
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          Algo<span>Simplified</span>
        </Link>

        <div className="auth-heading">
          <h1>Welcome back!</h1>
          <p>Continue your coding journey with AlgoSimplified.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Mobile</label>
            <div className="auth-input">
              <Mail size={17} />
              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile"
                value={formData.mobile}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit">
            Login
            <ArrowRight size={17} />
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
