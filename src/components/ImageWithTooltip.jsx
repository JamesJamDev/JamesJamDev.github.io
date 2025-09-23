import React, { useState } from 'react';
import './ImageWithTooltip.css';

const ImageWithTooltip = ({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  tooltipPosition = 'bottom',
  ...props 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Don't show tooltip if no alt text
  if (!alt) {
    return <img src={src} alt={alt} className={className} style={style} {...props} />;
  }

  return (
    <div className={`image-tooltip-container ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={src}
        alt={alt}
        style={style}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        {...props}
      />
      {showTooltip && (
        <div className={`tooltip tooltip-${tooltipPosition}`}>
          {alt}
        </div>
      )}
    </div>
  );
};

export default ImageWithTooltip;