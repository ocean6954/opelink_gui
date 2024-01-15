import React from "react";
import Papa from "papaparse";

export default function ReadJSON() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;

        try {
          const parsedData = JSON.parse(result);

          // 各プロパティごとに1行ずつCSVに変換
          const csvData = Object.keys(parsedData).reduce((acc, key) => {
            const column = parsedData[key].map((item) => `"${item}"`).join(",");
            return acc + `${key},${column}\n`;
          }, "");

          // CSVファイルとして保存
          const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${fileName.replace(".json", "")}.csv`;
          link.click();
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
