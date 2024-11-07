import React, { useState, useEffect, useCallback } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicPlayer.css';

const MusicPlayer = ({ volume, setVolume }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  const fetchTracks = useCallback(async () => {
    try {
      const apiKey = import.meta.env.VITE_JAMENDO_CLIENT_ID;
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks?client_id=${apiKey}&format=json&limit=10&tags=pop`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      console.log("Data received from API:", data); // Vérifie ici les données reçues
      setTracks(data.results); // Assure-toi que `data.results` contient des pistes
    } catch (err) {
      setError('Impossible de récupérer les musiques. Merci de réessayer plus tard.');
      console.error(err);
    }
  }, []);
  
  

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="music-player">
      <h2>Une brève écoute 🎵</h2>
      {error && <p className="error">{error}</p>}

      {/* Liste des pistes */}
      <div className="track-list">
        {tracks.map((track) => (
          <div key={track.id} className="track-item" onClick={() => playTrack(track)}>
            <img src={track.album_image} alt={track.name} className="track-image" />
            <div className="track-info">
              <p className="track-title">{track.name}</p>
              <p className="track-artist">{track.artist_name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lecteur audio */}
      {currentTrack && (
        <AudioPlayer
          src={currentTrack.audio} // URL de l'extrait audio
          showJumpControls={false}
          autoPlay
          volume={volume / 100}
          onVolumeChange={(e) => setVolume(e.target.volume * 100)}
          onEnded={() => setCurrentTrack(null)}
          customAdditionalControls={[]} // Personnalise les contrôles si nécessaire
        />
      )}
    </div>
  );
};

export default MusicPlayer;
