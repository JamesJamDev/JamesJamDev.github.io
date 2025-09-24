import React from 'react';
import './home.css';
import jamesPhoto from './assets/jamesPhoto.JPG';
import { useAnimateOnScroll } from './hooks/useIntersectionObserver';

const Home = () => {
    // Animation hooks for different elements
    const [imagesRef, imagesVisible] = useAnimateOnScroll(0.3, '50px');
    const [textRef, textVisible] = useAnimateOnScroll(0.3, '30px');
    const [linksRef, linksVisible] = useAnimateOnScroll(0.3, '20px');

    return (
        <section className="home-section">
            <div className="home-container">
                <h1 
                    ref={textRef}
                    className="home-title"
                    style={{
                        opacity: textVisible ? 1 : 0,
                        transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s ease-out'
                    }}
                >
                    About Me
                </h1>
                
                <div 
                    ref={imagesRef}
                    className="home-images-container"
                    style={{
                        opacity: imagesVisible ? 1 : 0,
                        transform: imagesVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease-out 0.2s'
                    }}
                >
                    <div className="home-image-card home-image-james">
                        <img
                            src={jamesPhoto}
                            alt="James (me) sitting in a chair playing an ocarina"
                            style={{
                                objectPosition: 'top center'
                            }}
                        />
                    </div>
                    <a 
                        href="https://www.youtube.com/@JellyJamDev/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="home-image-card home-image-link"
                    >
                        <img
                            src="https://yt3.ggpht.com/-hiy3v8iCfWR12SwU5alT1Mvt-ITQh1v3AXlz9IkxD3UG8AY0Dk3qacXSdp0ioCLmRFhKmgxiQ=s600-c-k-c0x00ffffff-no-rj-rp-mo"
                            alt="JellyJamDev YouTube profile picture - Click to visit channel"
                            style={{
                                objectPosition: 'center center'
                            }}
                        />
                    </a>
                </div>

                <div 
                    className="home-content"
                    style={{
                        opacity: textVisible ? 1 : 0,
                        transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s ease-out 0.4s'
                    }}
                >
                    <p className="home-description">
                        Hi, I'm James. I am a game developer who creates videos on the process of making games and share them for everyone to play.
                    </p>
                </div>

                <div 
                    ref={linksRef}
                    className="home-links"
                    style={{
                        opacity: linksVisible ? 1 : 0,
                        transform: linksVisible ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'all 0.8s ease-out 0.6s'
                    }}
                >
                    <a href="https://www.youtube.com/@JellyJamDev/" target="_blank" rel="noopener noreferrer" className="home-link youtube">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        YouTube
                    </a>
                    <a href="https://www.instagram.com/jamesjamdev/" target="_blank" rel="noopener noreferrer" className="home-link instagram">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                    </a>
                    <a href="https://www.tiktok.com/@jamesjamdev" target="_blank" rel="noopener noreferrer" className="home-link tiktok">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                        TikTok
                    </a>
                    <a href="https://jellyjamdev.itch.io//" target="_blank" rel="noopener noreferrer" className="home-link itch">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.397-1.102 2.397-2.41 0 1.308 1.107 2.41 2.435 2.41 1.33 0 2.398-1.102 2.398-2.41 0 1.308 1.106 2.41 2.435 2.41S19.22 7.277 19.22 5.97c0 1.308 1.106 2.41 2.436 2.41C22.78 8.38 24 7.233 24 5.93V4.95c-.02-.62-2.082-2.99-3.13-3.612C9.535-.845 9.54-.845 3.13 1.338zm9.29 4.865c-3.169 0-5.74 2.546-5.74 5.681 0 3.137 2.571 5.681 5.74 5.681 3.168 0 5.739-2.544 5.739-5.681 0-3.135-2.571-5.681-5.739-5.681zm0 1.816c2.263 0 4.096 1.816 4.096 4.096s-1.833 4.096-4.096 4.096c-2.264 0-4.097-1.816-4.097-4.096s1.833-4.096 4.097-4.096zm-5.847.795c-.37 0-.67.3-.67.67v2.264c0 .37.3.67.67.67h.794v3.17c0 .37.298.669.668.669h2.264c.37 0 .669-.299.669-.669v-3.17h.793c.37 0 .67-.3.67-.67V9.484c0-.37-.3-.67-.67-.67zm11.695 0c-.371 0-.67.3-.67.67v2.264c0 .37.299.67.67.67h.793v3.17c0 .37.299.669.669.669h2.264c.37 0 .669-.299.669-.669v-3.17h.794c.37 0 .669-.3.669-.67V9.484c0-.37-.299-.67-.669-.67z"/>
                        </svg>
                        Itch.io
                    </a>
                    <a href="https://github.com/JamesJamDev" target="_blank" rel="noopener noreferrer" className="home-link github">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Home;