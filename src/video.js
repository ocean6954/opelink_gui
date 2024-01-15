import React, { useState, useRef } from "react";
//import { ReactMediaRecorder } from "react-media-recorder";
import ReactPlayer from "react-player";
import styles from "./styles/video.module.css";

const Video = () => {
  const videoURL = "result.mp4";

  //動画時間表示のため
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [currentHours, setCurrentHours] = useState(0);
  //倍速機能
  const [playbackRate, setPlaybackRate] = useState(1);
  //10秒スキップ用
  const playerRef = useRef(null);

  const handleProgress = (state) => {
    const totalSeconds = Math.floor(state.playedSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
    setCurrentHours(hours);
  };

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
    <div className={styles.wrapper}>
      {/* <div>
        <ReactMediaRecorder
          video
          render={({ status, startRecording, stopRecording }) => (
            <div>
              <p>{status}</p>
              <video
                src={videoURL}
                controls
                autoplay
                loop
                style={{ width: "60vw", height: "auto" }}
              />
            </div>
          )}
        />
      </div> */}
      <div className={styles.videoDisplay}>
        <ReactPlayer
          ref={playerRef}
          url={videoURL} // 相対パスを指定
          controls
          width="100%"
          height="100%"
          playbackRate={playbackRate}
          onProgress={handleProgress}
        />
      </div>
      <div className={styles.panel}>
        <p>
          現在の再生時間: {currentHours}時{currentMinutes}分 {currentSeconds}秒
        </p>
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
    </div>
  );
};

export default Video;
