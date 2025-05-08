import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === "admin" && password === "pass") {
      navigate("/main");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="header">
        <img
          src="../src/projectbot/icons/logo-white.png"
          alt="top-left-logo"
          className="top-left-logo"
        />

        <div className="top-right-info">
          <div>
            {time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div>📅 Week 19</div>
          <div>
            🕒{" "}
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      <div className="auth-content">
        <img
          src="../src/projectbot/logos/projectbot-logo-full-color.svg"
          alt="center-logo"
          className="center-logo"
        />

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="user name"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <span className="fa fa-user input-icon"></span>
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="fa fa-eye input-icon"></span>
          </div>
          <button type="submit">Register</button>
          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>

      <div className="bottom-right-time">
        As of {time.toLocaleDateString("de-DE")} -{" "}
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
};

export default Auth;
