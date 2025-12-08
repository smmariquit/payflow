"use client";

import { useState } from "react";
import { LayoutDashboard, Database, Sparkles, Lock, Upload } from "lucide-react";
import MobileHandoff from "./MobileHandoff";
import AIInsights from "./AIInsights";
import AIPayrollOnboarding from "./AIPayrollOnboarding";
import ADALockInVisual from "./ADALockInVisual";

export default function EmployerView() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "upload" | "mobile" | "ai" | "ada">("upload");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#B82329]">Home Credit PayFlow</h1>
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

            <button
              onClick={() => setActiveTab("ada")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "ada"
                  ? "bg-red-50 text-[#B82329]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Lock className="w-5 h-5" />
              <span className="font-medium">ADA Strategy</span>
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
              <AIPayrollOnboarding />
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

          {activeTab === "ada" && (
            <div>
              <ADALockInVisual />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
