import React from 'react';
import jellyJamLogo from './assets/jellyjam.png';
import youtubeIcon from './assets/youtubeLogo.png';
import itchIOLogo from './assets/itchio.png';

const JellyJamIcon = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>JellyJam Channel</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '12px' }}>
                <a href="https://www.youtube.com/c/@JellyJamDev" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeIcon} className="jellyjam" alt="YouTube Logo" style={{ width: '145px', height: '100px' }} />
                </a>
            </div>
            <h1>Try out my Games!</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '12px' }}>
                <a href="https://jellyjamdev.itch.io" target="_blank" rel="noopener noreferrer">
                    <img src={itchIOLogo} className="jellyjam" alt="Itch.io Logo" style={{ width: '100px', height: '100px' }} />
                </a>
            </div>
        </div>
    );
};

export default JellyJamIcon;