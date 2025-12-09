"use client";

import { useState } from "react";
import { LayoutDashboard, Database, Sparkles, Lock, Upload, TrendingUp, TrendingDown, Users, DollarSign, AlertCircle, Clock, CheckCircle, Calendar } from "lucide-react";
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Total Employees</div>
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">1,247</div>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>12% from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">EWA Disbursed</div>
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">₱2.4M</div>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>8% from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Active Withdrawals</div>
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">342</div>
                  <div className="text-sm text-gray-500 mt-2">Last 24 hours</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Avg. EWA Amount</div>
                    <TrendingUp className="w-5 h-5 text-[#B82329]" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">₱1,850</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                    <span>Per transaction</span>
                  </div>
                </div>
              </div>

              {/* AI Insights Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* EWA Adoption Rate */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">EWA Adoption Rate</h3>
                    <Sparkles className="w-5 h-5 text-[#B82329]" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Active Users</span>
                        <span className="font-semibold text-gray-900">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Repeat Users</span>
                        <span className="font-semibold text-gray-900">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">First-Time Users</span>
                        <span className="font-semibold text-gray-900">23%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-600 h-2 rounded-full" style={{ width: "23%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong className="text-[#B82329]">AI Insight:</strong> Adoption rate increased 15% after UI simplification
                    </p>
                  </div>
                </div>

                {/* Cash Flow Prediction */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Cash Flow Prediction</h3>
                    <Sparkles className="w-5 h-5 text-[#B82329]" />
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Expected Disbursements (Next 7 Days)</div>
                    <div className="text-3xl font-bold text-gray-900">₱4.2M</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Mon-Wed</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#B82329] h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <span className="font-semibold text-gray-900">₱1.8M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Thu-Fri</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#B82329] h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                        <span className="font-semibold text-gray-900">₱2.4M</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong className="text-[#B82329]">AI Insight:</strong> Peak demand expected Thu-Fri (payday proximity)
                    </p>
                  </div>
                </div>
              </div>

              {/* Employee Financial Health & Risk Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Financial Health Score */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Employee Financial Health</h3>
                    <Sparkles className="w-5 h-5 text-[#B82329]" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">72%</div>
                      <div className="text-xs text-gray-600 mt-1">Healthy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600">21%</div>
                      <div className="text-xs text-gray-600 mt-1">At Risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">7%</div>
                      <div className="text-xs text-gray-600 mt-1">High Risk</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-green-800">
                        <CheckCircle className="w-4 h-4" />
                        <span>897 employees using EWA responsibly (&lt;20% of earnings)</span>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-amber-800">
                        <AlertCircle className="w-4 h-4" />
                        <span>262 employees accessing 40-60% of earnings</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong className="text-[#B82329]">AI Recommendation:</strong> Send financial wellness tips to at-risk group
                    </p>
                  </div>
                </div>

                {/* Risk Alerts */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">AI Risk Alerts</h3>
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm font-semibold text-red-900">High Frequency Pattern Detected</div>
                          <div className="text-sm text-red-700 mt-1">34 employees accessing EWA 5+ times/month</div>
                          <button className="text-xs text-red-800 underline mt-2">View Details →</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm font-semibold text-amber-900">Increasing Withdrawal Amounts</div>
                          <div className="text-sm text-amber-700 mt-1">128 employees requesting more than usual</div>
                          <button className="text-xs text-amber-800 underline mt-2">View Details →</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm font-semibold text-blue-900">Seasonal Trend Analysis</div>
                          <div className="text-sm text-blue-700 mt-1">December shows 45% increase in EWA requests</div>
                          <button className="text-xs text-blue-800 underline mt-2">View Report →</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADA Performance & Upcoming Paydays */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ADA Repayment Performance */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">ADA Repayment Performance</h3>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-gray-600 mt-2">Automatic Repayment Success Rate</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">₱2.1M</div>
                      <div className="text-xs text-gray-600 mt-1">Collected This Month</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">₱850K</div>
                      <div className="text-xs text-gray-600 mt-1">Pending Collection</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong className="text-[#B82329]">AI Insight:</strong> Zero defaults since ADA implementation
                    </p>
                  </div>
                </div>

                {/* Upcoming Paydays */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Settlements</h3>
                    <Calendar className="w-5 h-5 text-[#B82329]" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-900">December 15, 2025</div>
                        <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">In 6 days</div>
                      </div>
                      <div className="text-2xl font-bold text-[#B82329]">₱850,000</div>
                      <div className="text-sm text-gray-600 mt-1">482 employees • Avg ₱1,763/employee</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-900">December 30, 2025</div>
                        <div className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">In 21 days</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">₱1.2M</div>
                      <div className="text-sm text-gray-600 mt-1">638 employees • Projected</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm text-[#B82329] font-medium hover:underline">
                      Download Settlement Report →
                    </button>
                  </div>
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
