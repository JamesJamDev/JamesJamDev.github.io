import React from 'react';
import './header.css';

const Header = () => (
    <header>
        <nav>
            <ul className="nav-list">
                <li><a href="#home" className="nav-link">Home</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;