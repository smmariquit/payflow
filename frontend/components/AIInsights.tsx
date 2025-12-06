"use client";

import { useState, useEffect } from "react";
import { TrendingUp, AlertCircle, Lightbulb, Target } from "lucide-react";
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
      console.error("Error fetching AI insights:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-50 border-green-200 text-green-900";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-900";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-900";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "medium":
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      case "low":
      default:
        return <Target className="w-5 h-5 text-blue-600" />;
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
  }

  return (
    <div className="space-y-6">
      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#B82329]" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        </div>

        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${getSeverityColor(
                insight.severity
              )}`}
            >
              <h4 className="font-semibold mb-1">{insight.title}</h4>
              <p className="text-sm">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-[#B82329]" />
          <h3 className="text-lg font-semibold text-gray-900">
            AI Recommendations
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
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Save ₱{rec.potential_savings.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 uppercase">
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
