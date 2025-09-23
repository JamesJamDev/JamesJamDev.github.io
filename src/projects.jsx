import React, { useState, useEffect } from 'react';
import './projects.css';
import steamLogo from './assets/steamlogo.png';
import youtubeLogo from './assets/youtubeLogo.png';
import boxceptionImage from './assets/boxception.jpg';
import tinyCompanyImage from './assets/tinyCompany.png';
import ProjectCounter from './components/ProjectCounter';

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
      features: ["Unique Box Mechanics", "Merge with specific objects to control them", "Puzzle Solving", "Immersive Story"],
      status: "In Development",
      releaseDate: "2026",
      platformText: "Wishlist On",
      platform: {
        name: "Steam",
        logo: steamLogo,
        link: "https://store.steampowered.com/app/1729280/Boxception/"
      },
      youtubeUrl: "",
      steamEmbed: true,
      steamAppId: "1729280"
    },
    {
      title: "Tiny Company",
      description: "A mod that adds extra challenge to Lethal Company by making the players tiny, changing how they interact with the world and enemies.",
      detailedDescription: "A mod for the game Lethal Company that shrinks the players down to a tiny size. This changes how players interact with the environment and enemies, making for a fresh and challenging experience. Players will need to adapt their strategies and use their new size to their advantage in order to survive and complete objectives.",
      image: tinyCompanyImage,
      imagePosition: "center top",
      technologies: ["Unity", "C#", "BepInEx"],
      features: ["New Player Size", "Hoarding Bugs can carry the player", "Environmental Interaction Changes"],
      status: "Released",
      releaseDate: "2024",
      platformText: "Download On",
      platform: {
        name: "Thunderstore",
        logo: "https://thunderstore.io/favicon.ico",
        link: "https://thunderstore.io/c/lethal-company/p/JellyJam/Tiny_Company/"
      },
      youtubeUrl: "https://youtu.be/4rmfBOBv6Ew",
      counters: [
        {
          title: "Downloads",
          apiUrl: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://thunderstore.io/api/experimental/package/JellyJam/Tiny_Company/"),
          defaultValue: 0
        }
      ]
    },
    {
      title: "JellyJam Channel",
      description: "From showcasing the intricacies of game development to sharing entertaining mod showcases and skits, the channel offers a variety of content for gamers and developers alike.",
      detailedDescription: "The JellyJam channel has a heavy focus on game development and modding content. From showcasing the intricacies of game development to sharing entertaining mod showcases and occasionally skits, the channel is an outlet for me to share my passion for games and game development with a wider audience. Whether you're a fellow developer looking for insights or a gamer seeking fun and engaging content, there's something for everyone on the channel.",
      image: youtubeLogo,
      imagePosition: "center center",
      technologies: ["Video Editing", "SEO Optimization", "Game Dev"],
      features: ["Devlogs", "Mod Showcases", "Game Jams", "Skits"],
      status: "Ongoing",
      releaseDate: "2019-Present",
      platformText: "Watch On",
      platform: {
        name: "YouTube",
        logo: youtubeLogo,
        link: "https://www.youtube.com/@JellyJamDev/"
      },
      youtubeUrl: "",
      counters: [
        {
          title: "Subscribers",
          apiUrl: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCGTiQy1L8rsutN-COhaQizg&key=AIzaSyAgpxy0_kNbcvaoTFBmkhhBLASgrQwuuDg"),
          defaultValue: 2630
        },
        {
          title: "Views",
          apiUrl: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCGTiQy1L8rsutN-COhaQizg&key=AIzaSyAgpxy0_kNbcvaoTFBmkhhBLASgrQwuuDg"),
          defaultValue: 198267
        }
      ] 
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
                
                <div className="project-bottom-section">
                  {/* Project Counters - only show for projects without Steam embed */}
                  {!project.steamEmbed && project.counters && project.counters.length > 0 && (
                    <div className="project-counters">
                      {project.counters.map((counter, counterIndex) => (
                        <ProjectCounter
                          key={counterIndex}
                          apiUrl={counter.apiUrl}
                          title={counter.title}
                          defaultValue={counter.defaultValue}
                          formatNumber={true}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Steam wishlist button for Steam projects */}
                  {project.steamEmbed && (
                    <div className="project-wishlist-section">
                      <a 
                        href={project.platform.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wishlist-button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        + Add to Wishlist
                      </a>
                    </div>
                  )}
                  
                  <div className="click-hint">Click for more details</div>
                </div>
                
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

              {selectedProject.steamEmbed && selectedProject.steamAppId && (
                <div className="modal-steam-widget">
                  <h3>Steam Store Page</h3>
                  <iframe 
                    src="https://store.steampowered.com/widget/1729280/" 
                    frameBorder="0" 
                    width="646" 
                    height="190"
                    style={{ width: '100%', maxWidth: '646px', height: '190px', border: 'none', borderRadius: '8px' }}
                  ></iframe>
                </div>
              )}

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