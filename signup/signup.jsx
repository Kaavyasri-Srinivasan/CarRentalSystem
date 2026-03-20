/*
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3002/users')
        .then(res => setUsers(res.data))
        .catch(err => console.error('Error fetching users:', err));
    }, []);

    const [form, setForm] = useState({
        uname: "",
        username: "",
        pwd: "",
        mobile: ""
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Check if username already exists (client-side validation)
            const usernameExists = users.some(u => u.username === form.username);
            if (usernameExists) {
                setError("Username already exists.");
                setIsLoading(false);
                return;
            }

            // Add new user to the database
            const response = await axios.post("http://localhost:3002/users", {
                uname: form.uname,
                username: form.username,
                pwd: form.pwd,
                mobile: form.mobile
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Check if server returned success
            if (response.data && response.data.success) {
                alert("Signup successful! Please login.");
                navigate("/login");
            } else {
                setError(response.data.error || "Signup successful! Please login.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            
            // Handle different error types
            if (err.response) {
                // Server responded with error status
                const serverError = err.response.data.error || "Server error occurred";
                setError(serverError);
            } else if (err.request) {
                // Request made but no response received
                setError("Network error. Please check your connection.");
            } else {
                // Something else happened
                setError("Error signing up. Please try again.");
            }
        } finally {
            setIsLoading(false);
           //setIsLoading(true);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Sign Up</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="uname">Full Name</label>
                    <input
                        type="text"
                        id="uname"
                        name="uname"
                        value={form.uname}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button 
                    type="submit" 
                    className="login-btn" 
                    disabled={isLoading}
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
            <div className="toggle-section">
                <span>
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="toggle-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Signup;*/

import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3002/users')
        .then(res => setUsers(res.data))
        .catch(err => console.error('Error fetching users:', err));
    }, []);

    const [form, setForm] = useState({
        uname: "",
        username: "",
        pwd: "",
        mobile: ""
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };
    /*

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        setIsLoading(true);  // Disable and hide button immediately after click

        try {
            // Check if username already exists (client-side validation)
            const usernameExists = users.some(u => u.username === form.username);
            if (usernameExists) {
                setError("Username already exists.");
                setIsLoading(false);
                return;
            }

            // Add new user to the database
            const response = await axios.post("http://localhost:3002/users", {
                uname: form.uname,
                username: form.username,
                pwd: form.pwd,
                mobile: form.mobile
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Check if server returned success
            if (response.data && response.data.success) {
                alert("Signup successful! Please login.");
                navigate("/login");
            } else {
                setError(response.data.error || "Signup successful! Please login.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            
            if (err.response) {
                const serverError = err.response.data.error || "Server error occurred";
                setError(serverError);
            } else if (err.request) {
                setError("Network error. Please check your connection.");
            } else {
                setError("Error signing up. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };*/

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    setIsLoading(true);  // Disable and hide button immediately after click

    try {
        // Check if username already exists (client-side validation)
        const usernameExists = users.some(u => u.username === form.username);
        if (usernameExists) {
            setError("Username already exists.");
            setIsLoading(false); // You can keep this here to show button again on error
            return;
        }

        // Add new user to the database
        const response = await axios.post("http://localhost:3002/users", {
            uname: form.uname,
            username: form.username,
            pwd: form.pwd,
            mobile: form.mobile
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Check if server returned success
        if (response.data && response.data.success) {
            alert("Signup successful! Please login.");
            navigate("/login");
        } else {
            setError(response.data.error || "Signup successful! Please login.");
        }
    } catch (err) {
        console.error("Signup error:", err);
        
        if (err.response) {
            const serverError = err.response.data.error || "Server error occurred";
            setError(serverError);
        } else if (err.request) {
            setError("Network error. Please check your connection.");
        } else {
            setError("Error signing up. Please try again.");
        }
        setIsLoading(false); // Show button again on error
    }
    // Removed finally block to keep button hidden after successful submit
};

    return (
        <div className="login-container">
            <h2 className="login-title">Sign Up</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="uname">Full Name</label>
                    <input
                        type="text"
                        id="uname"
                        name="uname"
                        value={form.uname}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                
                {/* Button disappears once clicked */}
                {!isLoading && (
                    <button 
                        type="submit" 
                        className="login-btn"
                    >
                        Sign Up
                    </button>
                )}
            </form>
            <div className="toggle-section">
                <span>
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="toggle-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Signup;