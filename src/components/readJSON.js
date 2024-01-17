import React, { useState, useEffect } from "react";
import jsonFile from "../assets/result.json";

const ReadJson = ({ currentSeconds, onResult }) => {
  const [jsonData, setJsonData] = useState({
    timestamp: [],
    layer1: [],
    layer2: [],
    layer3: [],
  });

  //JSONファイルの中身を配列に格納するために最初に呼び出す
  const [jsonResultArrays, setJsonResultArrays] = useState([]);
  useEffect(() => {
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
    setJsonResultArrays(results);
  }, [jsonFile]);

  //動画時間に対応するjsonデータを探して返す
  // useEffect(() => {
  //   const matchingData = findDataForCurrentTime(currentSeconds);
  //   setJsonData(matchingData);

  //   // 結果を親コンポーネントに渡す
  //   onResult(matchingData);
  // }, [currentSeconds]);

  // //動画時間が一致するデータを探すための関数
  // const findDataForCurrentTime = (currentTime) => {
  //   const matchingData = jsonResultArrays.find(
  //     (data) => data.timestamp === currentTime
  //   );
  //   console.log(`マッチしたデータは`, matchingData);
  //   return matchingData;
  // };

  return (
    <div>
      <div>
        {jsonResultArrays.map((arr, index) => (
          <div key={index}>
            <p>Timestamp: {arr.timestamp}</p>
            <p>Layer1: {arr.layer1}</p>
            <p>Layer2: {arr.layer2}</p>
            <p>Layer3: {arr.layer3}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadJson;
