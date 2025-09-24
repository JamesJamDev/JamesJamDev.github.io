import React, { useState, useEffect } from 'react';
import { useAnimateOnScroll } from './hooks/useIntersectionObserver';
import './youtube.css';

/**
 * YouTube Section Component
 * 
 * Features:
 * - Fetches          <h2 
            className=\"youtube-title\"
            style={{ 
              color: '#fff', 
              background: 'none',
              WebkitTextFillColor: '#fff',
              backgroundClip: 'unset',
              WebkitBackgroundClip: 'unset'
            }}
          >
            Recent Videos
          </h2>
          <p className=\"youtube-subtitle\">
            Check out my latest game development content and tutorialstest 5 videos from @JellyJamDev channel automatically
 * - Embedded YouTube players for each video
 * - Glass morphism design matching site aesthetics
 * - Scroll-triggered animations
 * - Responsive layout
 */

const YouTube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Intersection observer hooks for animations
  const { ref: titleRef, isVisible: titleVisible } = useAnimateOnScroll();
  const { ref: videosRef, isVisible: videosVisible } = useAnimateOnScroll();

  // YouTube channel ID for @JellyJamDev
  const CHANNEL_ID = 'UCGTiQy1L8rsutN-COhaQizg';
  const API_KEY = 'AIzaSyAgpxy0_kNbcvaoTFBmkhhBLASgrQwuuDg';

  useEffect(() => {
    // Load specific requested fallback videos
    const loadFallbackVideos = () => {
      console.log('Loading fallback videos...');
      setVideos([
        {
          id: { videoId: 'VfW4wgNhSdE' },
          snippet: {
            title: 'I made a NEW video game controller',
            publishedAt: '2024-03-15T10:00:00Z',
            description: 'Creating a custom game controller from scratch!'
          },
          contentDetails: {
            duration: 'PT8M45S'
          }
        },
        {
          id: { videoId: '4rmfBOBv6Ew' },
          snippet: {
            title: 'I tried to play peak while tiny',
            publishedAt: '2024-02-10T10:00:00Z',
            description: 'Gaming challenge: playing while incredibly small!'
          },
          contentDetails: {
            duration: 'PT12M30S'
          }
        },
        {
          id: { videoId: 'fC7oUOUEEi4' },
          snippet: {
            title: 'I tried to play lethal company while tiny',
            publishedAt: '2024-01-20T10:00:00Z',
            description: 'Horror gaming but tiny - what could go wrong?'
          },
          contentDetails: {
            duration: 'PT15M22S'
          }
        }
      ]);
      setLoading(false);
    };

    const fetchLatestVideos = async () => {
      try {
        setLoading(true);
        console.log('Attempting to fetch YouTube videos...');
        
        // First, get the channel info to find the uploads playlist ID
        const channelUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${CHANNEL_ID}&part=contentDetails`
        )}`;

        console.log('Fetching channel info...');
        const channelResponse = await fetch(channelUrl);
        const channelData = await channelResponse.json();
        
        console.log('Channel response:', channelData);
        
        if (channelData.status.http_code === 200) {
          const channelParsed = JSON.parse(channelData.contents);
          console.log('Channel parsed:', channelParsed);
          
          if (channelParsed.items && channelParsed.items[0]) {
            const uploadsPlaylistId = channelParsed.items[0].contentDetails.relatedPlaylists.uploads;
            console.log('Uploads playlist ID:', uploadsPlaylistId);
            
            // Now fetch the latest videos from the uploads playlist
            const videosUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
              `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=5&order=date`
            )}`;

            console.log('Fetching videos...');
            const videosResponse = await fetch(videosUrl);
            const videosData = await videosResponse.json();
            
            console.log('Videos response:', videosData);
            
            if (videosData.status.http_code === 200) {
              const videosParsed = JSON.parse(videosData.contents);
              console.log('Videos parsed:', videosParsed);
              
              if (videosParsed.items && videosParsed.items.length > 0) {
                // Get video IDs to fetch detailed information
                const videoIds = videosParsed.items.map(item => item.snippet.resourceId.videoId).join(',');
                
                // Fetch video details to filter out Shorts and get aspect ratios
                const detailsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
                  `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet`
                )}`;

                const detailsResponse = await fetch(detailsUrl);
                const detailsData = await detailsResponse.json();
                
                if (detailsData.status.http_code === 200) {
                  const detailsParsed = JSON.parse(detailsData.contents);
                  
                  // Filter out Shorts (videos under 60 seconds) and add aspect ratio info
                  const filteredVideos = detailsParsed.items
                    .filter(video => {
                      const duration = parseDuration(video.contentDetails.duration);
                      return duration >= 60; // Filter out videos shorter than 60 seconds (Shorts)
                    })
                    .slice(0, 5) // Take first 5 non-Short videos
                    .map(video => ({
                      id: { videoId: video.id },
                      snippet: video.snippet,
                      contentDetails: video.contentDetails,
                      isShort: parseDuration(video.contentDetails.duration) < 60
                    }));
                  
                  console.log('Filtered videos (no Shorts):', filteredVideos);
                  setVideos(filteredVideos);
                  setLoading(false);
                  return;
                }
              }
            }
          }
        }
        
        // If we get here, something failed - use fallback
        console.log('API failed, using fallback videos');
        loadFallbackVideos();
        
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        console.log('Using fallback videos due to error');
        loadFallbackVideos();
      }
    };

    // Start with fallback videos immediately, then try to fetch real ones
    loadFallbackVideos();
    
    // Also try to fetch real videos (will update if successful)
    setTimeout(() => {
      fetchLatestVideos();
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateTitle = (title, maxLength = 60) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  // Parse YouTube duration format (PT4M13S) to seconds
  const parseDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Format duration for display
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="youtube-section" id="youtube">
      <div className="youtube-container">
        <div 
          ref={titleRef}
          className="youtube-header"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <h2 
            className="youtube-title"
            style={{ 
              color: '#fff',
              fontWeight: '600',
              fontSize: '3rem',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #007bff, #0056b3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Recent Videos
          </h2>
          <p className="youtube-subtitle">
          </p>
        </div>

        <div 
          ref={videosRef}
          className="youtube-content"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
          }}
        >

          
          {loading ? (
            <div className="youtube-loading">
              <div className="loading-spinner"></div>
              <p>Loading latest videos...</p>
            </div>
          ) : error ? (
            <div className="youtube-error">
              <p>Unable to load videos at the moment.</p>
              <p>Please visit my <a href="https://www.youtube.com/@JellyJamDev/" target="_blank" rel="noopener noreferrer">YouTube channel</a> directly.</p>
            </div>
          ) : videos.length > 0 ? (
            <div className="youtube-grid" style={{ display: 'grid', gap: '2rem' }}>
              {videos.map((video, index) => (
                <div 
                  key={video.id.videoId} 
                  className="youtube-card"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    minHeight: '300px'
                  }}
                >
                  <button 
                    className="youtube-video-button"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank')}
                    style={{ 
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '0',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="youtube-thumbnail-wrapper">
                      <img 
                        src={`https://img.youtube.com/vi/${video.id.videoId}/maxresdefault.jpg`}
                        alt={video.snippet.title}
                        className="youtube-thumbnail"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${video.id.videoId}/hqdefault.jpg`;
                        }}
                      />
                      <div className="youtube-play-overlay">
                        <svg className="youtube-play-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      {video.contentDetails && (
                        <div 
                          className="video-duration"
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: 'rgba(0, 0, 0, 0.9)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            zIndex: '2'
                          }}
                        >
                          {formatDuration(parseDuration(video.contentDetails.duration))}
                        </div>
                      )}
                    </div>
                  </button>
                  <div className="youtube-video-info">
                    <h3 className="youtube-video-title">
                      {truncateTitle(video.snippet.title)}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <p className="youtube-video-date">
                        {formatDate(video.snippet.publishedAt)}
                      </p>
                      {video.contentDetails && (
                        <span style={{ 
                          fontSize: '0.8rem', 
                          color: 'rgba(255, 255, 255, 0.6)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '12px'
                        }}>
                          {formatDuration(parseDuration(video.contentDetails.duration))}
                        </span>
                      )}
                    </div>
                    <p className="youtube-video-description">
                      {truncateTitle(video.snippet.description, 120)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="youtube-error">
              <p>No videos found. Check back later for new content!</p>
            </div>
          )}

          <div className="youtube-channel-link">
            <a 
              href="https://www.youtube.com/@JellyJamDev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="youtube-view-channel-btn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              View Full Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTube;