"use client";

import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet, LayoutDashboard, Database, Sparkles } from "lucide-react";
import MobileHandoff from "./MobileHandoff";
import { getApiBaseUrl } from "@/lib/api";
import AIInsights from "./AIInsights";

interface UploadResponse {
  success: boolean;
  filename: string;
  total_rows: number;
  columns: string[];
  preview: Record<string, any>[];
}

export default function EmployerView() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "upload" | "mobile" | "ai">("upload");
  const [uploadData, setUploadData] = useState<UploadResponse | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = getApiBaseUrl();
      const response = await fetch(`${apiUrl}/api/v1/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadData(data);
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#B82329]">PayFlow</h1>
          <p className="text-sm text-gray-600 mt-1">Employer Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "dashboard"
                  ? "bg-red-50 text-[#B82329]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "upload"
                  ? "bg-red-50 text-[#B82329]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Upload className="w-5 h-5" />
              <span className="font-medium">Migration Studio</span>
            </button>

            <button
              onClick={() => setActiveTab("mobile")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "mobile"
                  ? "bg-red-50 text-[#B82329]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Database className="w-5 h-5" />
              <span className="font-medium">Employee Data</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "ai"
                  ? "bg-red-50 text-[#B82329]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">AI Insights</span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <MobileHandoff />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p>Home Credit Philippines</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Total Employees</div>
                  <div className="text-3xl font-bold text-gray-900">1,247</div>
                  <div className="text-sm text-green-600 mt-2">↑ 12% from last month</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Total Disbursed</div>
                  <div className="text-3xl font-bold text-gray-900">₱2.4M</div>
                  <div className="text-sm text-green-600 mt-2">↑ 8% from last month</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Active Withdrawals</div>
                  <div className="text-3xl font-bold text-gray-900">342</div>
                  <div className="text-sm text-gray-500 mt-2">Last 24 hours</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Migration Studio</h2>
              <p className="text-gray-600 mb-6">Upload payroll CSV to process employee data</p>

              {/* Upload Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                  dragActive
                    ? "border-[#B82329] bg-red-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />

                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <FileSpreadsheet className="w-8 h-8 text-[#B82329]" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Drop CSV file here or click to browse
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Accepts .csv format only (Max 10MB)
                    </p>

                    <button
                      type="button"
                      className="bg-[#B82329] hover:bg-[#a01f25] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      Select File
                    </button>
                  </div>
                </label>
              </div>

              {uploading && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#B82329]"></div>
                    <span className="text-gray-600">Processing CSV...</span>
                  </div>
                </div>
              )}

              {/* Data Preview */}
              {uploadData && (
                <div className="mt-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-900">
                      ✓ Successfully uploaded <strong>{uploadData.filename}</strong>
                      <br />
                      <span className="text-sm text-green-700">
                        {uploadData.total_rows} rows • {uploadData.columns.length} columns
                      </span>
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Preview (First 5 Rows)</h3>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {uploadData.columns.map((col) => (
                              <th
                                key={col}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {uploadData.preview.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              {uploadData.columns.map((col) => (
                                <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {row[col]?.toString() || "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "mobile" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Employee Data</h2>
              <p className="text-gray-600 mb-6">Manage employee records and payroll data</p>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Employee Database
                </h3>
                <p className="text-gray-600">
                  Upload CSV files through Migration Studio to populate employee data
                </p>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Insights</h2>
              <p className="text-gray-600 mb-6">
                AI-powered analytics and recommendations for your payroll
              </p>

              <AIInsights />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
