"use client";

import { useEffect, useState } from "react";
import { Wallet, TrendingUp, Calendar } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";
import AIAssistant from "./AIAssistant";

interface EmployeeData {
  name: string;
  employee_id: string;
  earned_this_period: number;
  available_for_withdrawal: number;
  currency: string;
  pay_period: string;
  next_payday: string;
}

export default function EmployeeView() {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployeeData = async () => {
    try {
      const apiUrl = getApiBaseUrl();
      const response = await fetch(`${apiUrl}/api/v1/employee/me`);
      const data = await response.json();
      setEmployeeData(data.employee);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B82329]"></div>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Failed to load employee data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-[#B82329] text-white px-6 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">PayFlow</h1>
          <p className="text-red-100 text-sm">Welcome back, {employeeData.name}!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 -mt-4">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Wallet className="w-5 h-5" />
            <span className="text-sm font-medium">Available Balance</span>
          </div>

          <div className="mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {formatCurrency(employeeData.available_for_withdrawal)}
            </div>
            <div className="text-sm text-gray-500">
              Ready for withdrawal
            </div>
          </div>

          <button className="w-full bg-[#B82329] hover:bg-[#a01f25] text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl">
            Cash Out Now
          </button>
        </div>

        {/* Earnings Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Current Period</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Earned</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatCurrency(employeeData.earned_this_period)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Available Now</span>
              <span className="text-lg font-semibold text-[#B82329]">
                {formatCurrency(employeeData.available_for_withdrawal)}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{employeeData.pay_period}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1 ml-6">
                Next payday: {employeeData.next_payday}
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900">
            💡 <strong>Early Access:</strong> Cash out up to 30% of your earned wages before payday!
          </p>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
