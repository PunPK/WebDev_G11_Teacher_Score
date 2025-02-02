import * as XLSX from "xlsx";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";

const ExcelFetch = () => {
  const [data, setData] = useState([]);
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  const uploadToStrapi = async () => {
    try {
      const response = await ax.get("http://localhost:1337/api/users", {
      });


      const existingData = response.data;

      data.forEach(async (newItem) => {
        const match = existingData.find(
          (existing) => existing.username === newItem.username
        );

        if (match) {
          match.score = match.score || [];
          match.score.push(newItem.score);

          await ax.put(
            `http://localhost:1337/api/users/${match.id}`,
            { score: match.score }
          );
        }
      });

      console.log("Data successfully uploaded to Strapi!");
      alert("Data successfully uploaded to Strapi!");
    } catch (error) {
      console.error("Error uploading data to Strapi:", error);
      alert("Error uploading data to Strapi. Check the console for details.");
    }
  };

  return (
    <>
      <div className="col-sm-8 row-span-1">
        <h1>Hello {user.email}</h1>
      </div>
      <div className="grid bg-gradient-to-tl from-blue-600 to-cyan-400 h-screen mt-0 top-0">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />

        {data.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div>
          <button
            onClick={uploadToStrapi}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Upload to Strapi
          </button>
        </div>
      </div>
    </>
  );
};

export default ExcelFetch;
