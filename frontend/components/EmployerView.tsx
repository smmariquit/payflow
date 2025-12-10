"use client";

import { useState, useEffect } from "react";
import {
  Squares2X2Icon,
  CircleStackIcon,
  SparklesIcon,
  LockClosedIcon,
  ArrowUpTrayIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
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
  const [showSeasonalReport, setShowSeasonalReport] = useState(false);
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  const [showSettlementReport, setShowSettlementReport] = useState(false);
  const [modalOrigin, setModalOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

  const downloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewSeasonalReport = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) setModalOrigin({ x: e.clientX, y: e.clientY });
    setShowSeasonalReport(true);
  };

  const handleDownloadSettlementReport = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) setModalOrigin({ x: e.clientX, y: e.clientY });
    setShowSettlementReport(true);
  };


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Image src="/payflow.png" alt="PayFlow" width={128} height={32} className="rounded" />
          </div>
          <p className="text-sm text-gray-600 mt-1">Employer Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "dashboard"
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Squares2X2Icon className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "upload"
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <ArrowUpTrayIcon className="w-5 h-5" />
              <span className="font-medium">Migration Studio</span>
            </button>

            <button
              onClick={() => setActiveTab("mobile")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "mobile"
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <CircleStackIcon className="w-5 h-5" />
              <span className="font-medium">Employee Data</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "ai"
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <SparklesIcon className="w-5 h-5" />
              <span className="font-medium">AI Insights</span>
            </button>

            <button
              onClick={() => setActiveTab("ada")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === "ada"
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <LockClosedIcon className="w-5 h-5" />
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
          {/* Animated tab content wrapper */}
          <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Modals */}
          {showRiskDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg border border-gray-200 animate-in fade-in zoom-in-95"
                    style={{ transformOrigin: `${modalOrigin.x}px ${modalOrigin.y}px` }}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Risk Details</h3>
                  <button onClick={() => setShowRiskDetails(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <div className="p-6 space-y-6">
                  {/* High Frequency Pattern Graph */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-red-900">High Frequency Pattern (Transactions per Month)</div>
                      <span className="text-xs text-red-800">34 employees</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: "2", value: 25, count: 4 },
                        { label: "3", value: 45, count: 6 },
                        { label: "4", value: 60, count: 7 },
                        { label: "5", value: 80, count: 8 },
                        { label: "6+", value: 100, count: 9 },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-3">
                          <span className="w-10 text-xs text-red-900">{b.label}x</span>
                          <div className="flex-1 bg-red-100 h-2 rounded-full">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: `${b.value}%` }}></div>
                          </div>
                          <span className="text-xs text-red-900 w-8 text-right">{b.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Increasing Withdrawal Amounts - 6-month line chart */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-amber-900">Increasing Withdrawal Amounts (Past 6 Months)</div>
                      <span className="text-xs text-amber-800">128 affected employees</span>
                    </div>
                    {/* Minimal inline SVG line chart */}
                    {(() => {
                      const points = [
                        { m: "Jul", v: 38 },
                        { m: "Aug", v: 42 },
                        { m: "Sep", v: 47 },
                        { m: "Oct", v: 53 },
                        { m: "Nov", v: 61 },
                        { m: "Dec", v: 77 },
                      ];
                      const width = 520;
                      const height = 180; // add vertical space to avoid label clipping
                      const paddingX = 24;
                      const paddingY = 28; // increase top/bottom padding
                      const maxV = Math.max(...points.map(p => p.v));
                      const minV = Math.min(...points.map(p => p.v));
                      const stepX = (width - paddingX * 2) / (points.length - 1);
                      const yScale = (val: number) => {
                        const t = (val - minV) / (maxV - minV || 1);
                        return height - paddingY - t * (height - paddingY * 2);
                      };
                      const xScale = (i: number) => paddingX + i * stepX;
                      const path = points
                        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(p.v)}`)
                        .join(' ');
                      return (
                        <div className="w-full">
                          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44">
                            {/* grid */}
                            <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#FDE68A" />
                            <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#FDE68A" />
                            {/* area under line */}
                            <path d={`${path} L ${width - paddingX} ${height - paddingY} L ${paddingX} ${height - paddingY} Z`} fill="#F59E0B22" />
                            {/* line */}
                            <path d={path} stroke="#F59E0B" strokeWidth={3} fill="none" strokeLinecap="round" />
                            {/* points */}
                            {points.map((p, i) => (
                              <circle key={p.m} cx={xScale(i)} cy={yScale(p.v)} r={4} fill="#F59E0B" />
                            ))}
                            {/* labels */}
                            {points.map((p, i) => (
                              <text key={`label-${p.m}`} x={xScale(i)} y={height - 6} textAnchor="middle" fontSize="10" fill="#92400E">{p.m}</text>
                            ))}
                            {/* value badges */}
                            {points.map((p, i) => (
                              <g key={`badge-${p.m}`}>
                                <rect x={xScale(i) - 16} y={yScale(p.v) - 24} rx={4} width={32} height={16} fill="#FFF7ED" stroke="#F59E0B" />
                                <text x={xScale(i)} y={yScale(p.v) - 12} textAnchor="middle" fontSize="10" fill="#92400E">{p.v}</text>
                              </g>
                            ))}
                          </svg>
                          <div className="mt-2 text-xs text-amber-900">Trend shows +22% increase from Jul to Dec.</div>
                          <div className="text-[11px] text-amber-800 mt-1">Badges show employee count per month; December peak: 77 employees.</div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-end">
                  <button onClick={() => setShowRiskDetails(false)} className="px-4 py-2 bg-gray-900 text-white rounded-lg">Close</button>
                </div>
              </div>
            </div>
          )}

          {showSeasonalReport && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg border border-gray-200 animate-in fade-in zoom-in-95"
                    style={{ transformOrigin: `${modalOrigin.x}px ${modalOrigin.y}px` }}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Seasonal Trend Report</h3>
                  <button onClick={() => setShowSeasonalReport(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="text-sm text-gray-700">Period: December. Observed Increase: 45% in EWA requests.</div>
                  {/* Simple bar chart for weekly windows */}
                  <div className="space-y-3">
                    {[ 
                      { label: "Mon-Wed", value: 75, amount: "₱1.8M", count: 482 },
                      { label: "Thu-Fri", value: 90, amount: "₱2.4M", count: 638 },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 w-20">{row.label}</span>
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gray-700 h-2 rounded-full" style={{ width: `${row.value}%` }}></div>
                          </div>
                          <span className="font-semibold text-gray-900 shrink-0">{row.amount}</span>
                          <span className="text-xs text-gray-600 shrink-0">{row.count} txns</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-700">
                    Recommendations: Prepare additional liquidity for Thu-Fri; consider fee optimization during peak windows.
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-end">
                  <button onClick={() => setShowSeasonalReport(false)} className="px-4 py-2 bg-gray-900 text-white rounded-lg">Close</button>
                </div>
              </div>
            </div>
          )}

          {showSettlementReport && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg border border-gray-200 animate-in fade-in zoom-in-95"
                    style={{ transformOrigin: `${modalOrigin.x}px ${modalOrigin.y}px` }}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Settlement Report</h3>
                  <button onClick={() => setShowSettlementReport(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-900">December 15, 2025</div>
                        <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">In 6 days</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">₱850,000</div>
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
                  <div className="text-sm text-gray-700">ADA Repayment Performance: 100% success rate. Zero defaults since ADA implementation.</div>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-between">
                  <button onClick={() => window.print()} className="px-4 py-2 bg-[#B82329] text-white rounded-lg">Download PDF</button>
                  <button onClick={() => setShowSettlementReport(false)} className="px-4 py-2 bg-gray-900 text-white rounded-lg">Close</button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Total Employees</div>
                    <UsersIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">1,247</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                    <span>12% from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">EWA Disbursed</div>
                    <CurrencyDollarIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">₱2.4M</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                    <span>8% from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Active Withdrawals</div>
                    <ClockIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">342</div>
                  <div className="text-sm text-gray-500 mt-2">Last 24 hours</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Avg. EWA Amount</div>
                    <ArrowTrendingUpIcon className="w-5 h-5 text-gray-600" />
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
                    <SparklesIcon className="w-5 h-5 text-gray-600" />
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
                      <strong className="text-gray-900">AI Insight:</strong> Adoption rate increased 15% after UI simplification
                    </p>
                  </div>
                </div>

                {/* Cash Flow Prediction */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Cash Flow Prediction</h3>
                    <SparklesIcon className="w-5 h-5 text-gray-600" />
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
                          <div className="bg-gray-700 h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <span className="font-semibold text-gray-900">₱1.8M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Thu-Fri</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-700 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                        <span className="font-semibold text-gray-900">₱2.4M</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong className="text-gray-900">AI Insight:</strong> Peak demand expected Thu-Fri (payday proximity)
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
                    <SparklesIcon className="w-5 h-5 text-gray-600" />
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
                        <CheckCircleIcon className="w-4 h-4 text-gray-600" />
                        <span>897 employees using EWA responsibly (&lt;20% of earnings)</span>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-amber-800">
                        <ExclamationCircleIcon className="w-4 h-4 text-gray-600" />
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
                    <ExclamationCircleIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm font-semibold text-red-900">High Frequency Pattern Detected</div>
                          <div className="text-sm text-red-700 mt-1">34 employees accessing EWA 5+ times/month</div>
                          <button onClick={(e) => { setModalOrigin({ x: e.clientX, y: e.clientY }); setShowRiskDetails(true); }} className="text-xs text-red-800 underline mt-2">View Details →</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm font-semibold text-amber-900">Increasing Withdrawal Amounts</div>
                          <div className="text-sm text-amber-700 mt-1">128 employees requesting more than usual</div>
                          <button onClick={(e) => { setModalOrigin({ x: e.clientX, y: e.clientY }); setShowRiskDetails(true); }} className="text-xs text-amber-800 underline mt-2">View Report →</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm font-semibold text-blue-900">Seasonal Trend Analysis</div>
                          <div className="text-sm text-blue-700 mt-1">December shows 45% increase in EWA requests</div>
                          <button onClick={(e) => handleViewSeasonalReport(e)} className="text-xs text-blue-800 underline mt-2">View Report →</button>
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
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
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
                    <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-900">December 15, 2025</div>
                        <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">In 6 days</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">₱850,000</div>
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
                    <button onClick={(e) => handleDownloadSettlementReport(e)} className="text-sm text-[#B82329] font-medium hover:underline">
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
                      <ChevronLeftIcon className="w-4 h-4" />
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#B82329] border border-[#B82329] rounded-lg hover:bg-[#9a1d22] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#B82329]"
                    >
                      Next
                      <ChevronRightIcon className="w-4 h-4" />
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
    </div>
  );
}
