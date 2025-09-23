import React from 'react';
import './contact.css';
import { useAnimateOnScroll } from './hooks/useIntersectionObserver';

const Contact = () => {
    // Individual animations for contact elements
    const [titleRef, titleVisible] = useAnimateOnScroll(0.5, '50px');
    const [textRef, textVisible] = useAnimateOnScroll(0.5, '30px');
    const [infoRef, infoVisible] = useAnimateOnScroll(0.5, '20px');

return (
    <section id="contact" className="contact-section">
        <div className="contact-container">
            <h2 
                ref={titleRef}
                className="contact-title"
                style={{
                    opacity: titleVisible ? 1 : 0,
                    transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s ease-out'
                }}
            >
                Contact
            </h2>
            <div className="contact-content">
                <p 
                    ref={textRef}
                    className="contact-text"
                    style={{
                        opacity: textVisible ? 1 : 0,
                        transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s ease-out 0.2s'
                    }}
                >
                    Get in touch! I'd love to hear from you.
                </p>
                
                <div 
                    ref={infoRef}
                    className="contact-info"
                    style={{
                        opacity: infoVisible ? 1 : 0,
                        transform: infoVisible ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'all 0.8s ease-out 0.4s'
                    }}
                >
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