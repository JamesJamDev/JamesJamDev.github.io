import { useState, useEffect } from 'react'
import './App.css'

import Header from './header';
import Home from './home';
import About from './about';
import Contact from './contact';

function App() {
  const [state, SetState] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset for header height

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
        height: '100px', 
        width: '100%',
        backgroundColor: 'transparent',
        borderTop: '1px solid #444'
      }}></div>
      
      {/* Home Section */}
      <section id="home" style={{ 
        minHeight: '100vh', 
        padding: '2rem',
        scrollMarginTop: '100px' // Offset for fixed header
      }}>
        <Home />
      </section>
      
      {/* About Section */}
      <About />
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
}

export default App
