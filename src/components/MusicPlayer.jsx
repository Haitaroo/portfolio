import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ volume }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Fetch music data from iTunes API using fetch
    const fetchTracks = async (limit = 10) => {
      try {
        const response = await fetch(`/api/search?term=pop&limit=${limit}`, {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const uniqueTracks = [];
        const trackTitles = new Set();

        data.results.forEach(track => {
          if (!trackTitles.has(track.trackName)) {
            trackTitles.add(track.trackName);
            uniqueTracks.push(track);
          }
        });

        if (uniqueTracks.length < 10) {
          // Increase the limit and fetch again if we don't have enough unique tracks
          fetchTracks(limit + 10);
        } else {
          setTracks(uniqueTracks.slice(0, 10));
        }
      } catch (err) {
        setError('Failed to fetch tracks. Please try again later.');
        console.error(err);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    // Met à jour le volume de l'élément audio lorsque le volume change
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // Ajuste le volume entre 0 et 1
    }
  }, [volume]);

  const playTrack = (track) => {
    if (currentTrack && currentTrack.trackId === track.trackId) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      audioRef.current.src = track.previewUrl;
      audioRef.current.play();
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  return (
    <div className="music-player">
      <h2>Une brève écoute 🎵</h2>
      {error && <p className="error">{error}</p>}
      <div className="track-list">
        {tracks.map((track) => (
          <div key={track.trackId} className="track-item" onClick={() => playTrack(track)}>
            <img src={track.artworkUrl100} alt={track.trackName} className="track-image" />
            <div className="track-info">
              <p className="track-title">{track.trackName}</p>
              <p className="track-artist">{track.artistName}</p>
            </div>
            {currentTrack && currentTrack.trackId === track.trackId && (isPlaying ? '🎶' : '⏸️')}
          </div>
        ))}
      </div>
      {currentTrack && (
        <div className="controls">
          <button onClick={() => playTrack(currentTrack)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="current-track-info">
            <img src={currentTrack.artworkUrl100} alt={currentTrack.trackName} className="current-track-image" />
            <div className="current-track-details">
              <span className="current-track-title">{currentTrack.trackName}</span>
              <span className="current-track-artist">{currentTrack.artistName}</span>
            </div>
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
      />
    </div>
  );
};

export default MusicPlayer;
