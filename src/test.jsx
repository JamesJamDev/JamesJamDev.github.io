//import './test.css'
import React from 'react';
import steamLogo from './assets/steamlogo.png';
import tinyCompanyLogo from './assets/tinyCompany.png'; 
import boxceptionLogo from './assets/boxception.jpg';
import BoxceptionPhoto1 from './assets/BoxceptionPhoto1.png';
import BoxceptionPhoto2 from './assets/BoxceptionPhoto2.png';
export default function Projects() {
    const sectionGap = '75px';

    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const boxceptionImages = [boxceptionLogo, BoxceptionPhoto1, BoxceptionPhoto2];

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % boxceptionImages.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + boxceptionImages.length) % boxceptionImages.length);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', padding: '0 20px', gap: sectionGap }}>
            <h1>PROJECTS:</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', width: '100%' }}>
                <div style={{ flex: 1, textAlign: 'left', maxWidth: '40%' }}>
                    <h2>Boxception (2026)</h2>
                    <p>Boxception is a 3D puzzle game I am developing, where you use a variety of unique boxes to complete puzzles while
                        taking control over various objects in the game world. The game is currently in development.
                    </p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', maxWidth: '40%', position: 'relative' }}>
                    <button 
                        style={{ position: 'absolute', left: "0%", top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                        onClick={handlePreviousImage}
                    >
                        &#8592;
                    </button>
                    <img src={boxceptionImages[currentImageIndex]} className="jellyjam" alt="Boxception Logo" style={{ width: '400px', height: '200px', borderRadius: '15px' }} />
                    <button 
                        style={{ position: 'absolute', right: "0%", top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                        onClick={handleNextImage}
                    >
                        &#8594;
                    </button>
                    <h1>Wishlist on Steam!</h1>
                    <a href="https://store.steampowered.com/app/1729280/Boxception/" target="_blank" rel="noopener noreferrer">
                        <img src={steamLogo} className="jellyjam" alt="Steam Logo" style={{ width: '100px', height: '100px' }} />
                    </a>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', width: '100%', marginTop: sectionGap }}>
                <div style={{ flex: 1, textAlign: 'left', maxWidth: '40%' }}>
                    <h2>JellyJam's Tiny Company Mod (2024)</h2>
                    <p>JellyJam's Tiny Company Mod is a mod I created for 'Lethal Company'. This allows the players to shrink to a fraction of their size and
                        experience the world of Lethal Company in a whole new perspective, from struggling to climb up to the door, to a normally small bug being able
                        to kidnap you. This is sure to be a completely unique experience for the player.
                    </p>
                    <p>This mod has been played by many Youtubers, amassing over a total of 1 million views among the videos</p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', maxWidth: '40%' }}>
                    <a href="https://thunderstore.io/c/lethal-company/p/JellyJam/Tiny_Company/" target="_blank" rel="noopener noreferrer">
                        <img src={tinyCompanyLogo} className="jellyjam" alt="Tiny Company Mod Icon" style={{ width: '200px', height: '200px' }} />
                    </a>
                    <h1>YouTube Showcase</h1>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/4rmfBOBv6Ew?si=Qz1F9gfO64uYB5os" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', width: '100%', marginTop: sectionGap }}>
                <div style={{ flex: 1, textAlign: 'left', maxWidth: '40%' }}>
                    <h2>Timed Control 3D (2023)</h2>
                    <p>A remake of a game jam project where you have to survive in an area while defeating enemies, 
                        you earn coins to then buy power ups such as more health, stationary turrets to defend you or even explosive arrows, 
                        all to assist you in surviving the waves of enemies.
                    </p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', maxWidth: '40%' }}>
                    {/* Add an image or content here if needed */}
                </div>
            </div>
        </div>
    );
}