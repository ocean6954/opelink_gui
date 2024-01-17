import React, { useState, useRef, useEffect } from "react";
//import { ReactMediaRecorder } from "react-media-recorder";
import ReactPlayer from "react-player";
import styles from "./styles/video.module.css";
import ReadJson from "./components/readJSON";
import jsonFile from "./assets/result.json";

const Video = () => {
  const videoURL = "result.mp4";

  // ステートの初期化
  const [jsonResultArray, setJsonResultArray] = useState([]);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [foundData, setFoundData] = useState(null);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const playerRef = useRef(null);

  const loadJsonData = () => {
    // Jsonデータを処理して配列に変換
    const results = jsonFile.timestamp.map((timestamp, index) => {
      // ミリ秒を秒に変換
      const timestampInSeconds = timestamp / 1000;
      return {
        timestamp: timestampInSeconds,
        layer1: jsonFile.layer1[index],
        layer2: jsonFile.layer2[index],
        layer3: jsonFile.layer3[index],
      };
    });
    // 結果をセット
    setJsonResultArray(results);
  };

  const handleVideoProgress = (progress) => {
    // 現在の動画時間を更新
    setCurrentVideoTime(progress.playedSeconds);

    // 3. 現在の動画時間に一致するtimestampをjsonResultArrayから探す処理
    const foundItem = jsonResultArray.find(
      (item) =>
        Math.floor(item.timestamp) === Math.floor(progress.playedSeconds)
    );

    // 4. 見つかったデータをstateにセット
    setFoundData(foundItem);
  };

  useEffect(() => {
    loadJsonData();
  }, []);

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
      <div className={styles.videoDisplay}>
        <ReactPlayer
          ref={playerRef}
          url={videoURL} // 相対パスを指定
          controls
          width="100%"
          height="100%"
          playbackRate={playbackRate}
          onProgress={handleVideoProgress}
        />
      </div>
      <div className={styles.panel}>
        <p>現在の再生時間: {currentSeconds}秒</p>
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
        {/* <ReadJson
          currentSeconds={currentSeconds}
          onResult={handleReadJsonResult}
        /> */}
      </div>
      <div className={styles.result}>
        {foundData && (
          <div>
            <h2>Found Data:</h2>
            <pre>{JSON.stringify(foundData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
