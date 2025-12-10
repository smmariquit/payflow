"use client";

import { useEffect, useState } from "react";
import { Calendar, History, ChevronRight, TrendingUp, Sparkles } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";
import AIAssistant from "./AIAssistant";
import EWASliderScreen from "./EWASliderScreen";
import CashoutSuccessScreen from "./CashoutSuccessScreen";
import Image from "next/image";

interface EmployeeData {
  name: string;
  employee_id: string;
  earned_this_period: number;
  available_for_withdrawal: number;
  currency: string;
  pay_period: string;
  next_payday: string;
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: string;
  description: string;
}

interface Product {
  name: string;
  image: string;
  description: string;
  monthlyPayment: string;
}

type ScreenState = "dashboard" | "slider" | "success";

const products: Product[] = [
  {
    name: "iPhone 16",
    image: "/products/iphone16.png",
    description: "Latest iPhone with AI-powered features",
    monthlyPayment: "₱2,499/mo"
  },
  {
    name: "MacBook Laptop",
    image: "/products/Macbook-laptop.png",
    description: "Power your productivity",
    monthlyPayment: "₱4,999/mo"
  },
  {
    name: "AirPods",
    image: "/products/airpods-apple.png",
    description: "Premium wireless audio",
    monthlyPayment: "₱899/mo"
  },
  {
    name: "Kawasaki Ninja",
    image: "/products/kawasaki-ninja.png",
    description: "Ride your dreams",
    monthlyPayment: "₱8,999/mo"
  },
  {
    name: "Washing Machine",
    image: "/products/washing-machine.png",
    description: "Smart home appliance",
    monthlyPayment: "₱1,299/mo"
  }
];

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    date: "Dec 8, 2024",
    type: "EWA Withdrawal",
    amount: 2500,
    status: "Completed",
    description: "Early wage access"
  },
  {
    id: "TXN-002",
    date: "Dec 5, 2024",
    type: "EWA Withdrawal",
    amount: 1800,
    status: "Completed",
    description: "Early wage access"
  },
  {
    id: "TXN-003",
    date: "Nov 28, 2024",
    type: "EWA Withdrawal",
    amount: 3000,
    status: "Completed",
    description: "Early wage access"
  },
  {
    id: "TXN-004",
    date: "Nov 22, 2024",
    type: "Payroll",
    amount: 15000,
    status: "Completed",
    description: "Monthly salary"
  }
];

export default function EmployeeView() {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenState>("dashboard");
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % products.length);
    }, 4000); // Change product every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const apiUrl = getApiBaseUrl();
      const response = await fetch(`${apiUrl}/api/v1/employee/me`);
      const data = await response.json();
      setEmployeeData(data.employee);
    } catch (error) {
      // Silent fail - could add user-facing error handling here
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

  const handleLearnMore = () => {
    setSelectedProduct(products[activeProductIndex]);
    setShowProductModal(true);
  };

  const handleApplyWithEWA = () => {
    setShowProductModal(false);
    setCurrentScreen("slider");
  };

  const handleApplyFinancing = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      setIsRedirecting(false);
      setShowProductModal(false);
      // Here you would normally redirect to HomeCredit app
      // window.location.href = 'homecredit://...';
    }, 2000);
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
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 pb-8">
      {/* Header */}
      <div className="bg-[#B82329] text-white px-6 pb-8 pt-4">
        <div className="max-w-md mx-auto">
          <div className="mb-1">
            <Image src="/payflow_white.png" alt="Payflow" width={180} height={32} priority />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 -mt-8">
        {/* Earnings Card - emphasize accessible amount over earned */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-5">
          <div className="text-center mb-8">
            {/* Prominent: accessible amount */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-green-900 mb-2">You can access up to</p>
              <div className="text-5xl font-extrabold text-[#B82329] leading-tight">
                {formatCurrency(employeeData.available_for_withdrawal)}
              </div>
            </div>

            {/* Secondary: earned so far */}
            <p className="text-gray-500 mb-1">You've already earned this cutoff</p>
            <div className="text-2xl font-semibold text-gray-900">
              {formatCurrency(employeeData.earned_this_period)}
            </div>
          </div>

          <button
            onClick={handleAccessEarnings}
            className="w-full bg-[#B82329] hover:bg-[#a01f25] text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Access My Earnings
          </button>
        </div>

        {/* Financial Wellness Score */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Your Financial Health</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Wellness Score</span>
                <span className="font-semibold text-green-600">Good</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-green-400 to-green-600" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600">72</div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            You're managing your finances well! Keep up the good work.
          </p>
        </div>

        {/* Product Ad Carousel */}
        <div className="bg-linear-to-br from-[#B82329] to-[#d62a31] rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                HomeCredit Products
              </span>
              <div className="flex gap-1.5">
                {products.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeProductIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="relative w-28 h-28 shrink-0 bg-white rounded-xl p-3 flex items-center justify-center">
                <Image
                  src={products[activeProductIndex].image}
                  alt={products[activeProductIndex].name}
                  width={100}
                  height={100}
                  className="object-contain drop-shadow-lg"
                  unoptimized
                  priority
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold mb-1 truncate">{products[activeProductIndex].name}</h3>
                <p className="text-red-100 text-xs mb-3 line-clamp-2">{products[activeProductIndex].description}</p>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold">{products[activeProductIndex].monthlyPayment}</span>
                  <button 
                    onClick={handleLearnMore}
                    className="bg-white text-[#B82329] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors w-fit"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div 
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => setShowTransactions(!showTransactions)}
          >
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showTransactions ? 'rotate-90' : ''}`} />
          </div>

          {showTransactions && (
            <div className="space-y-3">
              {mockTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{txn.description}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      txn.type === 'Payroll' ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {txn.type === 'Payroll' ? '+' : ''}{formatCurrency(txn.amount)}
                    </p>
                    <p className="text-xs text-green-600">{txn.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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

        {/* Financial Tip */}
        <div className="bg-linear-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-purple-900 mb-1">Financial Tip</h4>
              <p className="text-sm text-purple-800">
                Set aside 20% of your income for savings. Small steps today lead to big wins tomorrow! 💪
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && employeeData && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowProductModal(false);
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Product Image */}
            <div className="px-6 py-8 bg-gray-50 flex items-center justify-center">
              <div className="relative w-48 h-48 bg-white rounded-2xl p-6 shadow-lg">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={180}
                  height={180}
                  className="object-contain drop-shadow-lg"
                  unoptimized
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="px-6 py-6 space-y-4">
              <div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{selectedProduct.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Monthly Payment</span>
                    <span className="text-lg font-bold text-blue-900">{selectedProduct.monthlyPayment}</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Easy installment plans available with HomeCredit
                  </p>
                </div>
              </div>

              {/* EWA Integration */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-600 rounded-lg shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-900 mb-1">Use Your Earned Wages</h4>
                    <p className="text-sm text-green-800 mb-3 leading-relaxed">
                      Access your earned salary early! You have <span className="font-bold text-green-700">{formatCurrency(employeeData.available_for_withdrawal)}</span> available now.
                    </p>
                    <button
                      onClick={handleApplyWithEWA}
                      className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Access Earnings & Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Regular Apply Button */}
              <button
                onClick={handleApplyFinancing}
                disabled={isRedirecting}
                className="w-full bg-[#B82329] hover:bg-[#a01f25] active:bg-[#8a1b20] text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isRedirecting ? "Redirecting..." : "Apply for Financing"}
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Terms and conditions apply. Subject to credit approval.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
