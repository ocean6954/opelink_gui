import React, { useState, useEffect } from "react";
import jsonFile from "../assets/result.json";

const ReadJson = ({ getResults }) => {
  // const [jsonData, setJsonData] = useState({
  //   timestamp: [],
  //   layer1: [],
  //   layer2: [],
  //   layer3: [],
  // });

  //JSONファイルの中身を配列に格納するために最初に呼び出す
  const [jsonResultArrays, setJsonResultArrays] = useState([]);
  const jsonToArray = () => {
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
  };

  //動画時間に対応するjsonデータを探して返す
  // useEffect(() => {
  //   const matchingData = findDataForCurrentTime(currentSeconds);
  //   setJsonData(matchingData);

  //   // 結果を親コンポーネントに渡す
  //   onResult(matchingData);
  // }, [currentSeconds]);

  // //動画時間が一致するデータを探すための関数
  // const findDataForCurrentTime = (currentTime) => {
  //   const matchingData = jsonResultArrays.find((data) => {
  //     console.log(`timestampは`, data.timestamp);
  //     console.log(`currentTimeは`, currentTime);
  //     return data.timestamp === currentTime;
  //   });
  //   console.log(`マッチしたデータは`, matchingData);
  //   return matchingData;
  // };
};

export default ReadJson;
