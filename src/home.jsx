import React from 'react';
import jamesPhoto from './assets/jamesPhoto.JPG';
import ImageWithTooltip from './components/ImageWithTooltip';
import { useAnimateOnScroll } from './hooks/useIntersectionObserver';

const Home = () => {
    // Animation hooks for different elements
    const [imagesRef, imagesVisible] = useAnimateOnScroll(0.3, '50px');
    const [textRef, textVisible] = useAnimateOnScroll(0.3, '30px');
    const [linksRef, linksVisible] = useAnimateOnScroll(0.3, '20px');

    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            minHeight: '300px'
        }}>
            <div 
                ref={imagesRef}
                style={{ 
                    textAlign: 'center', 
                    marginBottom: '1.5rem',
                    opacity: imagesVisible ? 1 : 0,
                    transform: imagesVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s ease-out'
                }}
            >
                <ImageWithTooltip
                    src={jamesPhoto}
                    alt="James (me) sitting in a chair playing an ocarina"
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        objectPosition: 'top center'
                    }}
                    tooltipPosition="bottom"
                />
                <span style={{ display: 'inline-block', width: '32px' }} />
                <ImageWithTooltip
                    src="https://yt3.ggpht.com/-hiy3v8iCfWR12SwU5alT1Mvt-ITQh1v3AXlz9IkxD3UG8AY0Dk3qacXSdp0ioCLmRFhKmgxiQ=s600-c-k-c0x00ffffff-no-rj-rp-mo"
                    alt="JellyJamDev YouTube profile picture"
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        objectPosition: 'center center'
                    }}
                    tooltipPosition="bottom"
                />
            </div>
            <div 
                ref={textRef}
                style={{ 
                    textAlign: 'center',
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s ease-out 0.2s'
                }}
            >
                <h1>About Me</h1>
                <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                    Hi, I'm James. I am a game developer who creates videos on the process of making games and share them for everyone
                    to play.
                </p>
            </div>
            <div 
                ref={linksRef}
                style={{
                    opacity: linksVisible ? 1 : 0,
                    transform: linksVisible ? 'translateY(0)' : 'translateY(15px)',
                    transition: 'all 0.8s ease-out 0.4s'
                }}
            >
                Links: <a href="https://github.com/JamesJamDev" target="_blank" rel="noopener noreferrer">GitHub</a>, <a href="https://twitter.com/JamesJamDev" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
        </section>
    );
};

export default Home;