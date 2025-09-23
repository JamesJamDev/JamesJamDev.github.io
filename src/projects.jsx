import React, { useState, useEffect } from 'react';
import './projects.css';
import steamLogo from './assets/steamlogo.png';
import youtubeLogo from './assets/youtubeLogo.png';
import boxceptionImage from './assets/boxception.jpg';
import tinyCompanyImage from './assets/tinyCompany.png';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      // Store original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Cleanup function
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [selectedProject]);

  const projects = [
    {

      title: "Boxception",
      description: "What would happen if boxes were used for more than just storage? What if they could float? Be controlled at a distance? Or even rewind through time?",
      detailedDescription: "Boxception takes place in a futuristic setting where virtual worlds have became a real thing. You are one of the few lucky people to get selected to be a participant in the ongoing trials about a new fully immersive virtual world experience. The other participants get to go on great adventures to other worlds while you get stuck with... new boxes? Complete puzzles using these diverse boxes and slowly realize that maybe you were actually one of the lucky ones.",
      image: boxceptionImage,
      imagePosition: "center center",
      technologies: ["Godot", "Game Development", "Game Design"],
      features: ["50+ unique levels", "Minimalist design", "Progressive difficulty", "Achievement system"],
      status: "In Development",
      releaseDate: "2026",
      platformText: "Wishlist On",
      platform: {
        name: "Steam",
        logo: steamLogo,
        link: "https://store.steampowered.com/app/1729280/Boxception/"
      },
      youtubeUrl: ""
    },
    {
      title: "Tiny Company",
      description: "A business simulation game where you manage resources and grow your company from the ground up.",
      detailedDescription: "Build your business empire from a small startup to a thriving corporation. Manage resources, hire employees, research new technologies, and make strategic decisions that will determine your company's success.\n\nFeatures realistic business mechanics and engaging gameplay that teaches real-world business principles. Start with limited resources and work your way up to become a major industry player.",
      image: tinyCompanyImage,
      imagePosition: "center top",
      technologies: ["Unity", "C#", "UI/UX"],
      features: ["Resource management", "Employee hiring system", "Technology research tree", "Multiple business sectors"],
      status: "Released",
      releaseDate: "2024",
      platformText: "Download On",
      platform: {
        name: "Thunderstore",
        logo: "https://thunderstore.io/favicon.ico",
        link: "https://thunderstore.io/c/lethal-company/p/JellyJam/Tiny_Company/"
      },
      youtubeUrl: "https://youtu.be/4rmfBOBv6Ew"
    },
    {
      title: "Game Development Content",
      description: "Educational videos and tutorials showing the game development process from concept to completion.",
      detailedDescription: "A comprehensive series of educational content covering all aspects of game development. From initial concept and design through programming, art creation, and final release.\n\nPerfect for aspiring game developers who want to learn the entire development pipeline through real-world examples. Each video breaks down complex concepts into easy-to-understand segments.",
      image: youtubeLogo,
      imagePosition: "center center",
      technologies: ["Video Editing", "Teaching", "Game Dev"],
      features: ["Step-by-step tutorials", "Real development examples", "Beginner-friendly", "Regular updates"],
      status: "Ongoing",
      releaseDate: "2019-Present",
      platformText: "Watch On",
      platform: {
        name: "YouTube",
        logo: youtubeLogo,
        link: "https://www.youtube.com/@JellyJamDev/"
      },
      youtubeUrl: "" // Add your actual YouTube video URL here
    }
  ];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card clickable"
              onClick={() => openModal(project)}
            >
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{ objectPosition: project.imagePosition || 'center center' }}
                />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title} {project.releaseDate && `(${project.releaseDate})`}</h3>
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
                  style={{ marginTop: 'px', marginBottom: '8px' }}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="click-hint">Click for more details</div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            
            <div className="modal-header">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="modal-image"
                style={{ objectPosition: selectedProject.imagePosition || 'center center' }}
              />
              <div className="modal-title-section">
                <h2>{selectedProject.title} {selectedProject.releaseDate && `(${selectedProject.releaseDate})`}</h2>
                <div className="modal-status">
                  <span className={`status-badge ${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <div className="modal-platform">
                  <h3>{selectedProject.platformText || "Available On"}</h3>
                  <a 
                    href={selectedProject.platform.link} 
                    className="platform-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={selectedProject.platform.logo} alt={selectedProject.platform.name} />
                    <span>{selectedProject.platform.name}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-description">
                <h3>About</h3>
                {selectedProject.detailedDescription.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="modal-features-video-section">
                <div className="modal-features">
                  <h3>Key Features</h3>
                  <ul>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                {selectedProject.youtubeUrl && (
                  <div className="modal-video">
                    <h3>Video</h3>
                    <div className="video-container-medium">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedProject.youtubeUrl)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-tech">
                <h3>Technologies Used</h3>
                <div className="modal-tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;