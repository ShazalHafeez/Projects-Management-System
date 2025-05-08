import React from "react";
import "../styles/project.css";

function ProjectItem({ project }) {
  return (
    <div className="project-item">
      <div className="project-header">
        <h4>{project.name}</h4>
      </div>

      <div className="project-types">
        <p>
          <strong>Type:</strong> {project.projectType}
        </p>
        <p>
          <strong>Sub-Type:</strong> {project.projectSubType}
        </p>
      </div>

      <div className="project-detail">
        <p>
          <strong>Object Type:</strong> {project.objectType}
        </p>
      </div>

      <div className="project-address">
        <p>
          <strong>Address:</strong>
          <br />
          {project.houseNumber}, {project.street}, {project.location}
          <br />
          <strong>Postal Code:</strong> {project.postalCode}
        </p>
      </div>
    </div>
  );
}

export default ProjectItem;
//comment