import React from 'react';
import './about.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">About</h2>
        <div className="about-content">
          <p className="about-text">
            This is the about section. Add your content here.
          </p>
          <p className="about-text">
            You can include information about yourself, your background, 
            skills, experience, or whatever you'd like to share.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;