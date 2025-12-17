import React from 'react';
import './header.css';

const Header = () => (
    <header>
        <nav>
            <ul className="nav-list">
                <li><a href="#home" className="nav-link">Home</a></li>
                <li><a href="#projects" className="nav-link">Projects</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
                <li><a href="https://www.patreon.com/cw/jellyjamdev" className="nav-link nav-social" target="_blank" rel="noopener noreferrer">Patreon</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;