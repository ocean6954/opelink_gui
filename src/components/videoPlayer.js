import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import styles from "../styles/videoPlayer.module.css";

const VideoPlayer = ({ onProgress }) => {
  const playerRef = useRef(null);
  const videoURL = "result.mp4";
  const [playbackRate, setPlaybackRate] = useState(1);

  const handlePlaybackRate = (newPlaybackRate) => {
    setPlaybackRate(newPlaybackRate);
  };

  const handleSkipBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 10, "seconds");
    }
  };

  const handleSkipForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 10, "seconds");
    }
  };

  return (
    <>
      <div className={styles.videoDisplay}>
        <ReactPlayer
          ref={playerRef}
          url={videoURL} // 相対パスを指定
          controls
          width="100%"
          height="100%"
          playbackRate={playbackRate}
          onProgress={onProgress}
        />
      </div>
      <div className={styles.panel}>
        <label>
          倍速：
          <select
            value={playbackRate}
            onChange={(e) => handlePlaybackRate(parseFloat(e.target.value))}
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x(性能低め)</option>
          </select>
        </label>
        <button onClick={handleSkipBackward}>10秒戻る</button>
        <button onClick={handleSkipForward}>10秒進む</button>
      </div>
    </>
  );
};

export default VideoPlayer;
