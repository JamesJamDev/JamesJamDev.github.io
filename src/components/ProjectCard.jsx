import React from 'react';
import '../components/ProjectCounter.css';

const ProjectCard = ({ project, onClick }) => {
  const getTintClass = (project) => {
    if (project.steamEmbed) return 'steam-tint';
    if (project.platform && project.platform.name === 'Thunderstore') return 'thunderstore-tint';
    if (project.platform && project.platform.name === 'YouTube') return 'youtube-tint';
    return '';
  };

  return (
    <div className={`project-card clickable ${getTintClass(project)}`} onClick={() => onClick(project)}>
      <div className="project-image">
        <img src={project.image} alt={project.title} style={{ objectPosition: project.imagePosition || 'center center' }} />
      </div>
      <div className="project-content">
        <h3 className="project-title">
          {project.title} {project.releaseDate && `(${project.releaseDate})`}
          {project.platform && (
            <img src={project.platform.logo} alt={project.platform.name} className="title-platform-icon" />
          )}
        </h3>
        <p className="project-description">{project.description}</p>

        <div className="project-technologies" style={{ marginTop: 'px', marginBottom: '8px' }}>
          {project.technologies && project.technologies.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="project-bottom-section">
          {project.counters && project.counters.length > 0 && (
            <div className="project-counters">
              {/* ProjectCounter component is still used in Projects modal; keep simple here */}
            </div>
          )}

          <div className="click-hint">Click for more details</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
