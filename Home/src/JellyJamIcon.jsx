import React from 'react';
import jellyJamLogo from './assets/jellyjam.png';

const JellyJamIcon = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <h1>JellyJam</h1>
                <a href="https://www.youtube.com/c/@JellyJamDev" target="_blank" rel="noopener noreferrer">
                    <img src={jellyJamLogo} className="jellyjam" alt="JellyJam Logo" style={{ width: '100px', height: '100px' }}/>
                </a>
            </div>
        </div>
    );
};

export default JellyJamIcon;