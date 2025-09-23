import React from 'react';
import './contact.css';

const Contact = () => {
return (
    <section id="contact" className="contact-section">
        <div className="contact-container">
            <h2 className="contact-title">Contact</h2>
            <div className="contact-content">
                <p className="contact-text">
                    Get in touch! I'd love to hear from you.
                </p>
                
                <div className="contact-info">
                    <div className="contact-item">
                        <h3>Email</h3>
                        <p>business@jellyjam.dev</p>
                        <button
                            className="contact-email-button"
                            onClick={() => window.location.href = 'mailto:business@jellyjam.dev'}
                        >
                            Send Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
};

export default Contact;