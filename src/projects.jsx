import React from 'react';
import './projects.css';
import steamLogo from './assets/steamlogo.png';
import youtubeLogo from './assets/youtubeLogo.png';
import boxceptionImage from './assets/boxception.jpg';
import tinyCompanyImage from './assets/tinyCompany.png';

const Projects = () => {
  const projects = [
    {
      title: "Boxception",
      description: "A puzzle game where you manipulate boxes within boxes to solve increasingly complex challenges.",
      image: boxceptionImage,
      imagePosition: "center center", // Can be: "center", "top", "bottom", "left", "right", or specific like "center 20%"
      technologies: ["Godot", "C#", "Game Design"],
      platform: {
        name: "Steam",
        logo: steamLogo
      }
    },
    {
      title: "Tiny Company",
      description: "A business simulation game where you manage resources and grow your company from the ground up.",
      image: tinyCompanyImage,
      imagePosition: "center top", // Focuses on the top part of the image
      technologies: ["Unity", "C#", "UI/UX"],
      platform: {
        name: "Steam",
        logo: steamLogo
      }
    },
    {
      title: "Game Development Content",
      description: "Educational videos and tutorials showing the game development process from concept to completion.",
      image: youtubeLogo,
      imagePosition: "center center", // Centers the YouTube logo
      technologies: ["Video Editing", "Teaching", "Game Dev"],
      platform: {
        name: "YouTube",
        logo: youtubeLogo
      }
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{ objectPosition: project.imagePosition || 'center center' }}
                />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-platform">
                  <span className="platform-tag tech-tag">
                    <img
                      src={project.platform.logo}
                      alt={project.platform.name}
                      className="platform-logo"
                      style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 4 }}
                    />
                    {project.platform.name} <span style={{ marginLeft: 4, fontSize: '0.85em', color: '#888' }}>(Platform)</span>
                  </span>
                </div>
                <div
                  className="project-technologies"
                  style={{ marginTop: '12px' }}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;