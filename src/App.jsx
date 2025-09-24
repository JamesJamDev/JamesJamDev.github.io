import { useState, useEffect } from 'react'
import './App.css'

import Header from './header';
import Home from './home';
import Projects from './projects';
import Contact from './contact';
import { useAnimateOnScroll, useNavigation } from './hooks/useIntersectionObserver';

function App() {
  const [state, SetState] = useState(1);

  // Intersection Observer refs for animations
  const [homeRef, homeVisible] = useAnimateOnScroll(0.2, '100px');
  const [projectsRef, projectsVisible] = useAnimateOnScroll(0.1, '50px');
  const [contactRef, contactVisible] = useAnimateOnScroll(0.3, '50px');

  // Navigation refs for section tracking with better thresholds
  const [homeNavRef, homeInView] = useNavigation(0.3);
  const [projectsNavRef, projectsInView] = useNavigation(0.3);
  const [contactNavRef, contactInView] = useNavigation(0.3);

  // Update URL hash based on visible sections
  useEffect(() => {
    let currentSection = 'home';
    
    if (contactInView) currentSection = 'contact';
    else if (projectsInView) currentSection = 'projects';
    else if (homeInView) currentSection = 'home';

    // Update URL hash without triggering scroll
    if (window.location.hash !== `#${currentSection}`) {
      window.history.replaceState(null, null, `#${currentSection}`);
    }
  }, [homeInView, projectsInView, contactInView]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.05)), #242424',
      color: 'rgba(255, 255, 255, 0.87)',
      position: 'relative',
      /* Fix for mobile scrolling */
      WebkitOverflowScrolling: 'touch',
      touchAction: 'manipulation'
    }}>
      <Header />
      
      {/* Buffer area to prevent header from blocking content */}
      <div style={{ 
        height: '80px', 
        width: '100%',
        backgroundColor: 'transparent',
        borderTop: '1px solid #444'
      }}></div>
      
      {/* Home Section */}
      <section 
        id="home" 
        ref={homeRef}
        style={{ 
          padding: '2rem 1rem 1rem 1rem',
          scrollMarginTop: '80px', // Offset for fixed header
          opacity: homeVisible ? 1 : 0,
          transform: homeVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 50px, 0)',
          transition: 'all 1s ease-out',
          willChange: 'transform, opacity',
          pointerEvents: 'auto',
          touchAction: 'pan-y'
        }}
      >
        <Home />
      </section>
      
      {/* Projects Section */}
      <div 
        ref={(el) => {
          if (projectsRef.current !== el) projectsRef.current = el;
          if (projectsNavRef.current !== el) projectsNavRef.current = el;
        }}
        style={{
          opacity: projectsVisible ? 1 : 0,
          transform: projectsVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
          transition: 'all 1s ease-out 0.2s',
          willChange: 'transform, opacity',
          pointerEvents: 'auto',
          touchAction: 'pan-y'
        }}
      >
        <Projects />
      </div>
      
      {/* Contact Section */}
      <div 
        ref={(el) => {
          if (contactRef.current !== el) contactRef.current = el;
          if (contactNavRef.current !== el) contactNavRef.current = el;
        }}
        style={{
          opacity: contactVisible ? 1 : 0,
          transform: contactVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
          transition: 'all 1s ease-out 0.3s',
          willChange: 'transform, opacity',
          pointerEvents: 'auto',
          touchAction: 'pan-y'
        }}
      >
        <Contact />
      </div>
    </div>
  );
}

export default App;
