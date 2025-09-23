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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Update URL hash without triggering scroll
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, null, `#${sectionId}`);
            }
            break;
          }
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial hash
    handleScroll();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#242424',
      color: 'rgba(255, 255, 255, 0.87)',
      position: 'relative'
    }}>
      <Header />
      
      {/* Buffer area to prevent header from blocking content */}
      <div style={{ 
        height: '60px', 
        width: '100%',
        backgroundColor: 'transparent',
        borderTop: '1px solid #444'
      }}></div>
      
      {/* Home Section */}
      <section 
        id="home" 
        ref={homeRef}
        style={{ 
          padding: '1rem',
          scrollMarginTop: '60px', // Offset for fixed header
          opacity: homeVisible ? 1 : 0,
          transform: homeVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 1s ease-out'
        }}
      >
        <Home />
      </section>
      
      {/* Projects Section */}
      <div 
        ref={projectsRef}
        style={{
          opacity: projectsVisible ? 1 : 0,
          transform: projectsVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s ease-out 0.2s'
        }}
      >
        <Projects />
      </div>
      
      {/* Contact Section */}
      <div 
        ref={contactRef}
        style={{
          opacity: contactVisible ? 1 : 0,
          transform: contactVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease-out 0.4s'
        }}
      >
        <Contact />
      </div>
    </div>
  );
}

export default App
