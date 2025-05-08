import React from "react";
import ProjectItem from "./ProjectItem.jsx";
import "../styles/project.css";

function ProjectCard({ projects }) {
  return (
    <div className="project-card">
      {projects.map((proj, index) => (
        <ProjectItem key={index} project={proj} />
      ))}
    </div>
  );
}

export default ProjectCard;
//comment