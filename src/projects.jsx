import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './projects.css';
import projects from './lib/projectsData';
import ProjectCounter from './components/ProjectCounter';

/**
 * Projects component displays a showcase of portfolio projects with interactive modals
 * Features:
 * - Grid layout of project cards with live API counters
 * - Modal system for detailed project information
 * - Steam widget integration for game projects
 * - YouTube video embedding
 * - Live data from multiple APIs (YouTube, Thunderstore)
 */
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

  // Projects data is now centralized in src/lib/projectsData.js
  // Use the imported list and provide a quick toggle to show more items
  const [showAllProjects, setShowAllProjects] = React.useState(false);
  const INITIAL_VISIBLE = 6;

  // Grouping and sorting: group by `type` and sort each group by releaseDate
  const groupOrder = ['YouTube', 'Games', 'Mods', 'Other'];

  const parseDateValue = (p) => {
    if (!p.releaseDate) return 0;
    if (String(p.releaseDate).toLowerCase() === 'ongoing') return Number.POSITIVE_INFINITY;
    const n = parseInt(p.releaseDate, 10);
    return Number.isFinite(n) ? n : 0;
  };

  const groupedSorted = groupOrder.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});

  // Ensure projects with unknown/missing types go into 'Other'
  projects.forEach((p) => {
    const t = p.type && groupOrder.includes(p.type) ? p.type : 'Other';
    groupedSorted[t].push(p);
  });

  // Sort each group: ongoing (Infinity) first, then newer years before older
  Object.keys(groupedSorted).forEach((k) => {
    groupedSorted[k].sort((a, b) => parseDateValue(b) - parseDateValue(a));
  });

  const flattened = groupOrder.flatMap((k) => groupedSorted[k]);
  const visibleFlattened = showAllProjects ? flattened : flattened.slice(0, INITIAL_VISIBLE);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Function to get the appropriate tint class based on platform
  const getTintClass = (project) => {
    if (project.steamEmbed) return 'steam-tint';
    if (project.platform.name === 'Thunderstore') return 'thunderstore-tint';
    if (project.platform.name === 'YouTube') return 'youtube-tint';
    return '';
  };

  // Ensure all project cards match the tallest card height
  React.useEffect(() => {
    let timeoutId = null;

    const applyHeights = () => {
      const nodeList = document.querySelectorAll('.projects-container .project-card');
      const cards = Array.from(nodeList);
      if (!cards.length) return;

      // reset previously applied minHeight so measurements are accurate
      cards.forEach((c) => (c.style.minHeight = ''));

      // measure
      const heights = cards.map((c) => Math.ceil(c.getBoundingClientRect().height));
      const max = Math.max(...heights, 0);

      // apply
      cards.forEach((c) => (c.style.minHeight = `${max}px`));
    };

    // Recalculate when images load (they can change card height)
    const imgs = Array.from(document.querySelectorAll('.projects-container .project-card img'));
    const onImgLoad = () => {
      // small debounce
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(applyHeights, 80);
    };
    imgs.forEach((img) => img.addEventListener('load', onImgLoad));

    // initial apply + slight delay to catch late layout shifts
    applyHeights();
    const delayed = setTimeout(applyHeights, 250);

    window.addEventListener('resize', applyHeights);

    return () => {
      clearTimeout(delayed);
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', applyHeights);
      imgs.forEach((img) => img.removeEventListener('load', onImgLoad));
    };
  }, [showAllProjects]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Projects</h2>
        <div>
          {groupOrder.map((groupKey) => {
            const items = groupedSorted[groupKey] || [];
            // Determine which items should be shown (respect showAllProjects)
            const itemsToRender = showAllProjects
              ? items
              : items.filter((p) => visibleFlattened.includes(p));

            if (!itemsToRender || itemsToRender.length === 0) return null;

            return (
              <div key={groupKey} style={{ marginBottom: '2.25rem' }}>
                <h3 style={{ color: '#fff', margin: '0 0 1rem 0' }}>{groupKey}</h3>
                <div className="projects-grid">
                  {itemsToRender.map((project, index) => (
                    <div
                      key={project.title + index}
                      className={`project-card clickable ${getTintClass(project)}`}
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
                        <div className="title-row">
                          <h3 className="project-title">
                            {project.title}
                          </h3>
                        </div>

                        <div className="title-bubble">
                          <span className="release-bubble">{project.releaseDate || project.status || ''}</span>
                          {project.platform && (
                            <img src={project.platform.logo} alt={project.platform.name} className="bubble-platform-icon" />
                          )}
                        </div>
                        {/* Preview row replaces long description to keep cards short */}
                        <div className="preview-row">
                          <div className="preview-tags">
                            {project.technologies && project.technologies.slice(0, 4).map((tech, techIndex) => (
                              <span key={techIndex} className="tech-tag small">{tech}</span>
                            ))}
                          </div>

                          <div className="preview-embed">
                            {/* preview tags only now; platform actions moved to bottom */}
                          </div>
                        </div>

                        <div className="project-bottom-section">
                          {/* Full-width platform action placed at bottom of card */}
                          {project.steamEmbed && project.platform && (
                            <a
                              href={project.platform.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-large wishlist-mini bottom-action"
                              onClick={(e) => e.stopPropagation()}
                            >
                              +Wishlist
                            </a>
                          )}

                          {project.platform && project.platform.name === 'Thunderstore' && (
                            <a
                              href={project.platform.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-large download-mini bottom-action"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View
                            </a>
                          )}

                          {project.platform && project.platform.name === 'YouTube' && (
                            <a
                              href={project.platform.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-large channel-mini bottom-action"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View
                            </a>
                          )}

                          <div className="click-hint">Click for more details</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {projects.length > INITIAL_VISIBLE && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              className="show-more-btn"
              onClick={() => setShowAllProjects((s) => !s)}
            >
              {showAllProjects ? 'Show less' : `Show ${projects.length - INITIAL_VISIBLE} more`}
            </button>
          </div>
        )}

        {/* Patreon section */}
        <div id="patreon" className="patreon-section">
          <div className="patreon-container">
            <h3 className="patreon-title">Support on Patreon</h3>
            <p className="patreon-text">Become a patron to get extra perks and help support development.</p>
            <ul className="patreon-perks">
              <li>Early Access to Mods / Access to Exclusive Mods</li>
              <li>Test My Games</li>
              <li>Source Code of Specific Projects</li>
              <li>Patreon Exclusive Role in My Discord Server (Includes Discord benefits)</li>
            </ul>
            <a className="patreon-button" href="https://www.patreon.com/cw/jellyjamdev" target="_blank" rel="noopener noreferrer">Visit Patreon</a>
          </div>
        </div>

      </div>

      {/* Modal */}
      {selectedProject && createPortal(
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
        </div>,
        document.body
      )}
    </section>
  );
};

export default Projects;