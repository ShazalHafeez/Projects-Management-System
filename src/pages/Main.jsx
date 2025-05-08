import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProjectModal from "../components/AddProjectModal.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import "../styles/Main.css";

function getWeekNumber(d) {
  // courtesy https://stackoverflow.com/a/6117889
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil(((d - yearStart) / 86400000 + 1)/7);
}

export default function Main() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(new Date());
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");

  // tick clock
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (newProj) => {
    setProjects([...projects, newProj]);
    setShowModal(false);
  };

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
  const formattedTime = time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
  const weekNum = getWeekNumber(time);

  return (
    <div className="main-container">
      {/* ——— HEADER ——— */}
      <header className="main-header">
        <img
          className="header-logo"
          src="../src/projectbot/icons/logo-white.png"
          alt="Company Logo"
        />

        <div className="header-center">
          <div>{formattedDate}</div>
          <div>📅 Week {weekNum}</div>
          <div>🕒 {formattedTime}</div>
        </div>

        <div className="header-avatar">S</div>
      </header>

      {/* ——— CONTENT ——— */}
      <div className="main-content">
        <h1 className="page-title">Projects</h1>
        <span className="project-tag">VEU</span>

        <div className="search-btn-wrapper">
          <div className="search-input-container">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button
            className="new-project-btn"
            onClick={() => setShowModal(true)}
          >
            + New project
          </button>
        </div>

        {showModal && (
          <AddProjectModal
            onAdd={handleAddProject}
            onClose={() => setShowModal(false)}
          />
        )}

        {filtered.length > 0 ? (
          <ProjectCard projects={filtered} />
        ) : (
          <p className="no-projects">No projects were found.</p>
        )}
      </div>
    </div>
  );
}
