"use client";

import { ArrowRight, ArrowDown, Repeat, Shield, Wallet, TrendingUp } from "lucide-react";

export default function ADALockInVisual() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">How PayFlow Creates Loyalty</h2>
        <p className="text-gray-600">The automatic deduction arrangement that builds financial ecosystem lock-in</p>
      </div>

      {/* Flow Diagram */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-8">
        {/* Top Row: The Flow */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">WORK HOURS</h3>
            <p className="text-sm text-gray-600">(Payroll)</p>
          </div>

          <ArrowRight className="w-8 h-8 text-[#B82329] mx-4" />

          <div className="flex-1 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">EARNED WAGES</h3>
            <p className="text-sm text-gray-600">(Real-time)</p>
          </div>

          <ArrowRight className="w-8 h-8 text-[#B82329] mx-4" />

          <div className="flex-1 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-[#B82329]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">EWA ACCESS</h3>
            <p className="text-sm text-gray-600">(Instant)</p>
          </div>
        </div>

        {/* Middle: ADA Settlement */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <ArrowDown className="w-8 h-8 text-[#B82329]" />
            <div className="px-8 py-4 bg-linear-to-r from-red-50 to-orange-50 border-2 border-[#B82329] rounded-xl">
              <p className="font-bold text-[#B82329] text-lg">ADA Auto-Settlement</p>
              <p className="text-sm text-gray-600">Automatic deduction on payday</p>
            </div>
            <ArrowDown className="w-8 h-8 text-[#B82329]" />
          </div>
        </div>

        {/* Bottom: Home Credit Rail */}
        <div className="bg-linear-to-r from-red-100 to-orange-100 border-2 border-[#B82329] rounded-xl p-6">
          <h3 className="text-2xl font-bold text-[#B82329] text-center mb-4">HOME CREDIT RAIL</h3>
          
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#B82329] rounded-full"></div>
              <span className="font-semibold text-gray-900">Savings</span>
            </div>
            
            <span className="text-gray-400">•</span>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#B82329] rounded-full"></div>
              <span className="font-semibold text-gray-900">Credit</span>
            </div>
            
            <span className="text-gray-400">•</span>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#B82329] rounded-full"></div>
              <span className="font-semibold text-gray-900">Insurance</span>
            </div>
            
            <span className="text-gray-400">•</span>
            
            <div className="flex items-center gap-2">
              <Repeat className="w-5 h-5 text-[#B82329]" />
              <span className="font-semibold text-gray-900">Repeat Every Payday</span>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-linear-to-br from-red-50 to-orange-50 border-2 border-[#B82329] rounded-2xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl text-gray-900 leading-relaxed">
            <span className="text-2xl text-[#B82329] font-bold">"</span>
            Where your payroll flows is where your financial loyalty stays. 
            <strong className="text-[#B82329]"> PayFlow turns millions of workers into a captured Home Credit market</strong> 
            — automatically.
            <span className="text-2xl text-[#B82329] font-bold">"</span>
          </blockquote>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-[#B82329] mb-2">100%</div>
          <div className="text-sm text-gray-600">Automatic Repayment Rate</div>
          <div className="text-xs text-gray-500 mt-2">Via ADA on every payday</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-[#B82329] mb-2">2x</div>
          <div className="text-sm text-gray-600">Financial Product Engagement</div>
          <div className="text-xs text-gray-500 mt-2">Cross-sell opportunity increase</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-[#B82329] mb-2">∞</div>
          <div className="text-sm text-gray-600">Lifetime Value Lock-In</div>
          <div className="text-xs text-gray-500 mt-2">Payroll-linked ecosystem</div>
        </div>
      </div>
    </div>
  );
}
