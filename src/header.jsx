import React from 'react';
import './header.css';

const Header = () => (
    <header>
        <nav>
            <ul className="nav-list">
                <li><a href="#home" className="nav-link">Home</a></li>
                <li><a href="#projects" className="nav-link">Projects</a></li>
                <li><a href="#youtube" className="nav-link">YouTube</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;