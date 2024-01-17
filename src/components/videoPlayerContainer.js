import React, { useState, useEffect } from "react";
import VideoPlayer from "./videoPlayer";
import FoundData from "./foundData";
import jsonFile from "../assets/result.json";

const VideoPlayerContainer = () => {
  // ステートの初期化
  const [jsonResultArray, setJsonResultArray] = useState([]);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [foundData, setFoundData] = useState(null);

  // 1. JSONファイルを読み込み、jsonResultArrayに格納する関数
  const loadJsonData = async () => {
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

  // 2. 動画の再生時間が更新されるたびに実行される処理
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

  // コンポーネントがマウントされた時に1回だけ実行
  useEffect(() => {
    loadJsonData();
  }, []); // 空の依存配列で、コンポーネントがマウントされた時のみ実行される

  return (
    <div>
      {/* VideoPlayerコンポーネントの呼び出し */}
      <VideoPlayer onProgress={handleVideoProgress} />

      {/* FoundDataDisplayコンポーネントの呼び出し */}
      <FoundData foundData={foundData} />
    </div>
  );
};

export default VideoPlayerContainer;
