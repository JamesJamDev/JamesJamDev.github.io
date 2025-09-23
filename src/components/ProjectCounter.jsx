import React, { useState, useEffect, useRef } from 'react';
import './ProjectCounter.css';

/**
 * ProjectCounter component fetches and displays live statistics from various APIs
 * Supports multiple API formats:
 * - YouTube Data API (subscribers, views)
 * - Thunderstore API (downloads)
 * - Generic APIs with CORS proxy support
 * 
 * @param {string} apiUrl - The API endpoint to fetch data from
 * @param {string} title - Display title for the counter
 * @param {number} defaultValue - Fallback value if API fails
 * @param {boolean} formatNumber - Whether to format large numbers (K, M)
 */
const ProjectCounter = ({ apiUrl, title, defaultValue = 0, formatNumber = true }) => {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [finalValue, setFinalValue] = useState(defaultValue);
  const counterRef = useRef(null);

  // Intersection Observer to detect when counter enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the counter is visible
        rootMargin: '20px'
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  // Animate counting from 0 to target value
  const animateCount = (targetValue) => {
    if (hasAnimated) {
      setCount(targetValue);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const increment = targetValue / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newCount = Math.min(Math.floor(increment * currentStep), targetValue);
      setCount(newCount);

      if (currentStep >= steps || newCount >= targetValue) {
        clearInterval(timer);
        setCount(targetValue);
        setHasAnimated(true);
      }
    }, duration / steps);

    setTargetCount(targetValue);
  };

  // Trigger animation when counter becomes visible
  useEffect(() => {
    if (isVisible && finalValue > 0 && !hasAnimated) {
      animateCount(finalValue);
    }
  }, [isVisible, finalValue, hasAnimated]);

  useEffect(() => {
    if (!apiUrl) {
      setFinalValue(defaultValue);
      return;
    }

    const fetchCount = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle CORS proxy response (allorigins)
        let actualData = data;
        if (data.contents) {
          // This is from the CORS proxy - parse the contents
          actualData = JSON.parse(data.contents);
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
          } else if (title.toLowerCase().includes('view')) {
            countValue = parseInt(stats.viewCount) || defaultValue;
          }
        } else if (actualData.latest && actualData.latest.downloads) {
          // Thunderstore API format - downloads are in latest.downloads
          countValue = actualData.latest.downloads;
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
        
        setFinalValue(countValue);
      } catch (err) {
        console.error('Error fetching count:', err);
        setError(err.message);
        setFinalValue(defaultValue);
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
    <div className="project-counter" ref={counterRef}>
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