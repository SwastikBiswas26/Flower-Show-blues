import { useState, useRef, useEffect } from 'react';
import Design from './Design';
import './LyricalComp.css';

const LyricalComp = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
    }
  };

  const handleLyricsChange = (e) => {
    setLyrics(e.target.value);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (audioFile) {
        URL.revokeObjectURL(audioFile);
      }
    };
  }, [audioFile]);

  return (
    <div className="lyrical-container">
      <Design />
      
      <div className="controls-panel">
        <div className="upload-section">
          <label htmlFor="audio-upload" className="upload-label">
            <span>🎵 Upload Song</span>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              className="file-input"
            />
          </label>
        </div>

        {audioFile && (
          <div className="player-section">
            <audio
              ref={audioRef}
              src={audioFile}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            
            <div className="player-controls">
              <button onClick={togglePlayPause} className="play-btn">
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              
              <div className="time-display">
                {formatTime(currentTime)}
              </div>
              
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="seek-bar"
              />
              
              <div className="time-display">
                {formatTime(duration)}
              </div>
            </div>
          </div>
        )}

        <div className="lyrics-section">
          <label className="lyrics-label">📝 Enter Lyrics (paragraph format)</label>
          <textarea
            value={lyrics}
            onChange={handleLyricsChange}
            placeholder="Paste your lyrics here in paragraph format..."
            className="lyrics-input"
            rows="6"
          />
        </div>
      </div>

      {lyrics && (
        <div className="lyrics-display">
          <div className="lyrics-content">
            {lyrics}
          </div>
        </div>
      )}
    </div>
  );
};

export default LyricalComp;