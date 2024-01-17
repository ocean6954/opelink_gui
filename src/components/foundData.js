import React from "react";
import styles from "../styles/foundData.module.css";

function applyHierarchy(foundData) {
  const hierarchyTables = [
    ["ダミーアイドリング", "腫瘍摘出前処置", "アイドリング", "腫瘍摘出処置"],
    [
      "機器準備",
      "皮質マッピングと組織診断",
      "腫瘍摘出",
      "白質マッピングと組織診断",
    ],
    [
      "機器セッティング",
      "ナビによる腫瘍位置確認",
      "皮質マッピング",
      "痙攣波への対処および機能野マーキング",
      "細い血管の凝固",
      "アクチノイド切開および病理用切片の採取",
      "静脈剥離, 脳溝剥離, 皮質切開",
      "動脈クリッピング・切除",
      "白質切開および腫瘍吸引, 腫瘍摘出",
      "白質マッピング",
      "痙攣波への対処および機能野マーキング",
      "病理用切片の採取",
      "アイドリング",
    ],
  ];

  const result = {
    layer1: hierarchyTables[0][foundData.layer1] || "Unknown",
    layer2: hierarchyTables[1][foundData.layer2] || "Unknown",
    layer3: hierarchyTables[2][foundData.layer3] || "Unknown",
  };

  return result;
}

const FoundData = ({ foundData }) => {
  if (!foundData) {
    return null;
  }

  const appliedHierarchy = applyHierarchy(foundData);
  // JSON.stringify(appliedHierarchy, null, 2);

  return (
    <div>
      {foundData && (
        <div>
          <h2>Found Data:</h2>
          <pre>{JSON.stringify(foundData, null, 2)}</pre>
          <div className={styles.identificationResult}>
            <p>
              {appliedHierarchy.layer1 === "アイドリング"
                ? "ログミッシング中です"
                : appliedHierarchy.layer1}
            </p>
            {"　"}
            {appliedHierarchy.layer1 !== "ダミーアイドリング" &&
              appliedHierarchy.layer1 !== "アイドリング" && (
                <>
                  <p>
                    {appliedHierarchy.layer2 === "Unknown"
                      ? "例外"
                      : appliedHierarchy.layer2}
                  </p>
                  {"　"}
                  <p>
                    {appliedHierarchy.layer3 === "Unknown"
                      ? "例外"
                      : appliedHierarchy.layer3}
                  </p>
                </>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundData;
