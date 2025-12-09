"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Database, Sparkles, Lock, Upload, TrendingUp, Users, DollarSign, AlertCircle, Clock, CheckCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import MobileHandoff from "./MobileHandoff";
import AIInsights from "./AIInsights";
import AIPayrollOnboarding from "./AIPayrollOnboarding";
import ADALockInVisual from "./ADALockInVisual";

interface Employee {
  employee_id: string;
  name: string;
  department: string;
  earned_this_period: number;
  available_ewa: number;
  status: string;
}

interface EmployeesResponse {
  success: boolean;
  employees: Employee[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export default function EmployerView() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "upload" | "mobile" | "ai" | "ada">("upload");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch employees when page changes
  useEffect(() => {
    if (activeTab === "mobile") {
      fetchEmployees(currentPage);
    }
  }, [currentPage, activeTab]);

  const fetchEmployees = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/employees?page=${page}&per_page=10`);
      const data: EmployeesResponse = await response.json();
      
      if (data.success) {
        setEmployees(data.employees);
        setTotalPages(data.pagination.total_pages);
        setTotalEmployees(data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#B82329]">HomeCredit PayFlow</h1>
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

              {/* Employee Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Earned This Period
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Available EWA
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 transition-opacity duration-200">
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                            Loading employees...
                          </td>
                        </tr>
                      ) : employees.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                            No employees found
                          </td>
                        </tr>
                      ) : (
                        employees.map((employee) => (
                          <tr key={employee.employee_id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {employee.employee_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {employee.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {employee.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₱{employee.earned_this_period.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                              ₱{employee.available_ewa.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                {employee.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalEmployees)}</span> of{" "}
                      <span className="font-medium">{totalEmployees}</span> employees
                    </p>
                    <span className="text-sm text-gray-500">
                      · Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#B82329] border border-[#B82329] rounded-lg hover:bg-[#9a1d22] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#B82329]"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
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
