/*
import React, { useState } from "react";
import axios from 'axios';
import "./login.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUser }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch users from the database
        axios.get('http://localhost:3002/users')  // Using the same port as signup
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }, []);
    
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({
        username: '',
        pwd: '',
    });
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (isSignup) {
            navigate("/signup");
        } else {
            try {
                // Find user in the database
                const user = users.find(
                    u => u.username === form.username && u.pwd === form.pwd
                );
                
                if (user) {
                    // Successful login
                    setIsAuthenticated(true);
                    setUser(user); // Store the entire user object
                    navigate("/welcome"); // Redirect to WelcomePage
                } else {
                    setError("Invalid username or password");
                }
            } catch (err) {
                setError("An error occurred. Please try again.");
            }
        }
    };
    
    return (
        <div className="login-container">
            <h2 className="login-title">{isSignup ? "Sign Up" : "Login"}</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input
                        type="password"
                        id="pwd"
                        name="pwd"
                        value={form.pwd}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="login-btn">{isSignup ? "Sign Up" : "Login"}</button>
            </form>
            <div className="toggle-section">
                {isSignup ? (
                    <span>
                        Already have an account?{' '}
                        <button
                            type="button"
                            className="toggle-btn"
                            onClick={() => setIsSignup(false)}
                        >
                            Login
                        </button>
                    </span>
                ) : (
                    <span>
                        New user?{' '}
                        <button
                            type="button"
                            className="toggle-btn"
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Sign Up
                        </button>
                    </span>
                )}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Login;*/

import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUser }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the database
    axios.get('http://localhost:3002/users') // Adjust port if needed
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    username: '',
    pwd: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      // If it's signup mode
      navigate("/signup");
    } else {
      try {
        // ✅ Admin login check first
        if (form.username === "Admin" && form.pwd === "Admin@123") {
          setIsAuthenticated(true);
          setUser({ username: "Admin" });
          navigate("/admin/dashboard"); // ✅ redirect to AdminDashboard
          return;
        }

        // ✅ Check normal users from DB
        const user = users.find(
          u => u.username === form.username && u.pwd === form.pwd
        );

        if (user) {
          setIsAuthenticated(true);
          setUser(user);
          navigate("/welcome"); // ✅ redirect to WelcomePage
        } else {
          setError("Invalid username or password");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">{isSignup ? "Sign Up" : "Login"}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={form.pwd}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="login-btn">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="toggle-section">
        {isSignup ? (
          <span>
            Already have an account?{" "}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setIsSignup(false)}
            >
              Login
            </button>
          </span>
        ) : (
          <span>
            New user?{" "}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </span>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;
