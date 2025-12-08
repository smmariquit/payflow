"use client";

import { useState } from "react";
import { ChevronLeft, Info } from "lucide-react";

interface EWASliderScreenProps {
  earnedAmount: number;
  maxAccess: number;
  onConfirm: (amount: number, fee: number) => void;
  onBack: () => void;
}

export default function EWASliderScreen({
  earnedAmount,
  maxAccess,
  onConfirm,
  onBack,
}: EWASliderScreenProps) {
  const [selectedAmount, setSelectedAmount] = useState(Math.floor(maxAccess / 2));
  
  // Calculate fee (2.6% of cashout amount)
  const calculateFee = (amount: number) => {
    return Math.round(amount * 0.026);
  };

  const fee = calculateFee(selectedAmount);
  
  // Calculate next payday (15th or 30th)
  const getNextPayday = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    let payday;
    if (currentDay < 15) {
      payday = new Date(currentYear, currentMonth, 15);
    } else if (currentDay < 30) {
      payday = new Date(currentYear, currentMonth, 30);
    } else {
      payday = new Date(currentYear, currentMonth + 1, 15);
    }
    
    return payday.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(Number(e.target.value));
  };

  const handleConfirm = () => {
    onConfirm(selectedAmount, fee);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-[#B82329] text-white px-6 py-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white mb-4 hover:opacity-80 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-2xl font-bold">Access My Earnings</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Earned so far:</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatCurrency(earnedAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Max you can access:</span>
              <span className="text-lg font-semibold text-[#B82329]">
                {formatCurrency(maxAccess)}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select amount to access:
            </label>

            {/* Amount Display */}
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-[#B82329]">
                {formatCurrency(selectedAmount)}
              </div>
            </div>

            {/* Slider */}
            <div className="px-2 mb-6">
              <input
                type="range"
                min="100"
                max={maxAccess}
                step="50"
                value={selectedAmount}
                onChange={handleSliderChange}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B82329]"
                style={{
                  background: `linear-gradient(to right, #B82329 0%, #B82329 ${
                    ((selectedAmount - 100) / (maxAccess - 100)) * 100
                  }%, #e5e7eb ${
                    ((selectedAmount - 100) / (maxAccess - 100)) * 100
                  }%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>₱100</span>
                <span>{formatCurrency(maxAccess)}</span>
              </div>
            </div>

            {/* Fee Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <div className="text-blue-900 mb-1">
                    <strong>Fee: {formatCurrency(fee)}</strong> • Auto-settles on payday ({getNextPayday()}) via ADA
                  </div>
                  <div className="text-blue-700 text-xs">
                    This amount will be automatically deducted from your paycheck
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-[#B82329] hover:bg-[#a01f25] text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
        >
          Confirm Cashout
        </button>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By confirming, you agree to the automatic deduction arrangement (ADA) on your next payday
        </p>
      </div>
    </div>
  );
}
