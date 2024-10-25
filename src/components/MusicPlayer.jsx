import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ volume, setVolume }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [volumeState, setVolumeState] = useState(volume); // État local pour gérer le volume
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTracks = async (limit = 10) => {
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/search?term=pop&limit=' + limit)}`, {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.contents) {
          const results = JSON.parse(data.contents).results;
          const uniqueTracks = [];
          const trackTitles = new Set();

          results.forEach(track => {
            if (!trackTitles.has(track.trackName)) {
              trackTitles.add(track.trackName);
              uniqueTracks.push(track);
            }
          });

          if (uniqueTracks.length < 10) {
            fetchTracks(limit + 10);
          } else {
            setTracks(uniqueTracks.slice(0, 10));
          }
        } else {
          throw new Error('Format de réponse invalide');
        }
      } catch (err) {
        setError('Impossible de récuperer les musiques. Merci de rééssayer plus tard.');
        console.error(err);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeState / 100;
    }
  }, [volumeState]);

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

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
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
          <div className="volume-control">
            <input type="range" min="0" max="100" value={volumeState} onChange={handleVolumeChange} />
            <span>{volumeState}%</span>
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
