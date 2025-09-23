import React from 'react';
import jamesPhoto from './assets/jamesPhoto.JPG';
import ImageWithTooltip from './components/ImageWithTooltip';

const Home = () => {
    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            minHeight: '300px'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
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
            <div style={{ textAlign: 'center' }}>
                <h1>About Me</h1>
                <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                    Hi, I'm James. I am a game developer who creates videos on the process of making games and share them for everyone
                    to play.
                </p>
            </div>
        </section>
    );
};

export default Home;