"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";
import AIAssistant from "./AIAssistant";
import EWASliderScreen from "./EWASliderScreen";
import CashoutSuccessScreen from "./CashoutSuccessScreen";

interface EmployeeData {
  name: string;
  employee_id: string;
  earned_this_period: number;
  available_for_withdrawal: number;
  currency: string;
  pay_period: string;
  next_payday: string;
}

type ScreenState = "dashboard" | "slider" | "success";

export default function EmployeeView() {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenState>("dashboard");
  const [cashoutAmount, setCashoutAmount] = useState(0);

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

  const handleAccessEarnings = () => {
    setCurrentScreen("slider");
  };

  const handleConfirmCashout = (amount: number, fee: number) => {
    setCashoutAmount(amount);
    setCurrentScreen("success");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
    // Refresh employee data
    fetchEmployeeData();
  };

  const handleBackFromSlider = () => {
    setCurrentScreen("dashboard");
  };

  // Handle different screens
  if (currentScreen === "slider" && employeeData) {
    return (
      <EWASliderScreen
        earnedAmount={employeeData.earned_this_period}
        maxAccess={employeeData.available_for_withdrawal}
        onConfirm={handleConfirmCashout}
        onBack={handleBackFromSlider}
      />
    );
  }

  if (currentScreen === "success") {
    return (
      <CashoutSuccessScreen
        amount={cashoutAmount}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B82329]"></div>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Failed to load employee data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-[#B82329] text-white px-6 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Home Credit App</h1>
          <p className="text-red-100 text-sm">Good evening, {employeeData.name}!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 -mt-4">
        {/* Earnings Card - Screen B1 Layout */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">You've already earned this cutoff:</p>
            <div className="text-5xl font-bold text-gray-900 mb-6">
              {formatCurrency(employeeData.earned_this_period)}
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">You can access up to:</p>
              <div className="text-2xl font-bold text-[#B82329]">
                {formatCurrency(employeeData.available_for_withdrawal)}
              </div>
            </div>
          </div>

          <button
            onClick={handleAccessEarnings}
            className="w-full bg-[#B82329] hover:bg-[#a01f25] text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Access My Earnings
          </button>
        </div>

        {/* Pay Period Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Pay Period</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{employeeData.pay_period}</span>
              <span className="text-gray-900 font-medium">Current Period</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Next payday:</span>
              <span className="text-gray-900 font-medium">{employeeData.next_payday}</span>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900">
            💡 <strong>Zero friction access:</strong> Your money, available when you need it. Simple as GCash!
          </p>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
