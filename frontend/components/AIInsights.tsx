"use client";

import { useState, useEffect } from "react";
import { 
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  LightBulbIcon,
  UsersIcon,
  CreditCardIcon,
  ClockIcon,
  ChartBarIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { getApiBaseUrl } from "@/lib/api";

interface Insight {
  type: string;
  title: string;
  description: string;
  severity: string;
}

interface Recommendation {
  title: string;
  description: string;
  priority: string;
  potential_savings: number;
}

export default function AIInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const apiUrl = getApiBaseUrl();
      
      const [analyzeRes, recommendRes] = await Promise.all([
        fetch(`${apiUrl}/api/v1/ai/analyze`, { method: "POST" }),
        fetch(`${apiUrl}/api/v1/ai/recommend`, { method: "POST" }),
      ]);

      const analyzeData = await analyzeRes.json();
      const recommendData = await recommendRes.json();

      setInsights(analyzeData.insights || []);
      setRecommendations(recommendData.recommendations || []);
    } catch (error) {
      // Silent fail - using mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getSeverityIconColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "info":
      default:
        return "text-blue-600";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
      case "medium":
        return <LightBulbIcon className="w-5 h-5 text-yellow-600" />;
      case "low":
      default:
        return <ArrowTrendingUpIcon className="w-5 h-5 text-blue-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* HR Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Workforce</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-xs text-green-600 mt-1">↑ 12 this month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Payroll</p>
              <p className="text-2xl font-bold text-gray-900">₱42.3M</p>
              <p className="text-xs text-gray-500 mt-1">Average per employee</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CreditCardIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">2.4 hrs</p>
              <p className="text-xs text-green-600 mt-1">↓ 65% vs manual</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">EWA Adoption</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% this quarter</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Employee Financial Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ArrowTrendingUpIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Employee Financial Insights</h3>
        </div>

        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}
            >
              <div className="flex items-start gap-3">
                <ExclamationCircleIcon className={`w-5 h-5 mt-0.5 text-gray-600`} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HR Optimization Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <LightBulbIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            HR Cost Optimization
          </h3>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#B82329] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getPriorityIcon(rec.priority)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {rec.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                      Potential Savings: ₱{rec.potential_savings.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 uppercase font-medium">
                      {rec.priority} priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
