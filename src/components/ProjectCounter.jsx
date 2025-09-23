import React, { useState, useEffect } from 'react';
import './ProjectCounter.css';

const ProjectCounter = ({ apiUrl, title, defaultValue = 0, formatNumber = true }) => {
  const [count, setCount] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiUrl) {
      setCount(defaultValue);
      return;
    }

    const fetchCount = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching from API:', apiUrl);
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle CORS proxy response (allorigins)
        let actualData = data;
        if (data.contents) {
          // This is from the CORS proxy - parse the contents
          actualData = JSON.parse(data.contents);
          console.log('Parsed proxy data:', actualData);
        }
        
        // Handle different API response formats
        let countValue = defaultValue;
        
        if (typeof actualData === 'number') {
          countValue = actualData;
        } else if (actualData.items && actualData.items[0] && actualData.items[0].statistics) {
          // YouTube API format
          const stats = actualData.items[0].statistics;
          if (title.toLowerCase().includes('subscriber')) {
            countValue = parseInt(stats.subscriberCount) || defaultValue;
            console.log('Found YouTube subscribers:', countValue);
          } else if (title.toLowerCase().includes('view')) {
            countValue = parseInt(stats.viewCount) || defaultValue;
            console.log('Found YouTube views:', countValue);
          }
        } else if (actualData.latest && actualData.latest.downloads) {
          // Thunderstore API format - downloads are in latest.downloads
          countValue = actualData.latest.downloads;
          console.log('Found downloads in latest:', countValue);
        } else if (actualData.package_download_count) {
          // Alternative Thunderstore API format
          countValue = actualData.package_download_count;
        } else if (actualData.download_count) {
          // Generic download count format
          countValue = actualData.download_count;
        } else if (actualData.count || actualData.value) {
          // Generic API formats
          countValue = actualData.count || actualData.value;
        }
        
        console.log('Setting count to:', countValue);
        setCount(countValue);
      } catch (err) {
        console.error('Error fetching count:', err);
        setError(err.message);
        setCount(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [apiUrl, defaultValue]);

  const formatCount = (num) => {
    if (!formatNumber) return num.toString();
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  // Don't render if there's no title
  if (!title || title.trim() === '') {
    return null;
  }

  return (
    <div className="project-counter">
      <div className="counter-value">
        {loading ? (
          <span className="counter-loading">...</span>
        ) : error ? (
          <span className="counter-error">--</span>
        ) : (
          <span className="counter-number">{formatCount(count)}</span>
        )}
      </div>
      <div className="counter-title">{title}</div>
    </div>
  );
};

export default ProjectCounter;