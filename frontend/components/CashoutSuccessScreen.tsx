"use client";

import { CheckCircle, Home, Lightbulb } from "lucide-react";

interface CashoutSuccessScreenProps {
  amount: number;
  onBackToDashboard: () => void;
}

export default function CashoutSuccessScreen({
  amount,
  onBackToDashboard,
}: CashoutSuccessScreenProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

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

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Cashout Successful!
          </h1>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[#B82329] mb-2">
              {formatCurrency(amount)}
            </div>
            <p className="text-gray-600">
              has been sent to your payroll-linked account.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 text-center">
              This will automatically settle on payday <strong>({getNextPayday()})</strong> through your ADA arrangement.
            </p>
          </div>

          {/* Tip Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">
                  Financial Tip
                </p>
                <p className="text-sm text-amber-800">
                  Use PayFlow to avoid loan apps and 5–6 lenders. Access your earned wages responsibly!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBackToDashboard}
          className="w-full bg-[#B82329] hover:bg-[#a01f25] text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
