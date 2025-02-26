import React, { useState } from "react";
import axios from "axios";
import { FaFilePdf, FaFileImage, FaFileCsv, FaFileAlt, FaUpload } from "react-icons/fa";

const DocumentUpload = () => {
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (event, docType) => {
    setFiles((prev) => ({ ...prev, [docType]: [...(prev[docType] || []), ...event.target.files] }));
  };

  const handleUpload = async (docType) => {
    if (!files[docType] || files[docType].length === 0) return alert(`Please select ${docType} files first`);

    const formData = new FormData();
    files[docType].forEach((file) => formData.append("documents", file));
    setLoading(true);
    
    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`${docType} uploaded successfully!`);
    } catch (error) {
      alert(`Upload failed for ${docType}`);
    } finally {
      setLoading(false);
    }
  };

  const documentTypes = [
    { name: "Form 16", key: "form16", icon: <FaFilePdf /> },
    { name: "Form 26AS", key: "form26AS", icon: <FaFileAlt /> },
    { name: "Salary Slips", key: "salarySlips", icon: <FaFileImage /> },
    { name: "Investment Proofs", key: "investmentProofs", icon: <FaFileCsv /> },
    { name: "Loan Documents", key: "loanDocuments", icon: <FaFilePdf /> },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-8 ">
      <div className="max-w-2xl mx-auto bg-white text-purple-950 border-2 border-purple-950 p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Upload Your Documents</h2>
        {documentTypes.map(({ name, key, icon }) => (
          <div key={key} className="mb-4 flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{icon}</span>
              <span className="font-semibold">{name}</span>
            </div>
            <input type="file" accept=".pdf,.csv,.json,.png,.jpg,.jpeg" multiple onChange={(e) => handleFileChange(e, key)} className="text-sm" />
            <button 
              onClick={() => handleUpload(key)}
              className="bg-purple-800 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-purple-700 transition disabled:opacity-50"
              disabled={loading}
            >
              <FaUpload />
              <span>{loading ? "Uploading..." : "Upload"}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUpload;
