"use client";

import { useState } from "react";
import { Upload, FileSpreadsheet, FileText, CheckCircle, AlertTriangle, ChevronRight, Sparkles } from "lucide-react";

interface FileUploadState {
  payroll: { uploaded: boolean; processing: boolean };
  timekeeping: { uploaded: boolean; processing: boolean };
  policies: { uploaded: boolean; processing: boolean };
}

type WizardStep = 1 | 2 | 3 | 4;

export default function AIPayrollOnboarding() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [files, setFiles] = useState<FileUploadState>({
    payroll: { uploaded: false, processing: false },
    timekeeping: { uploaded: false, processing: false },
    policies: { uploaded: false, processing: false },
  });

  const handleFileUpload = (type: keyof FileUploadState) => {
    setFiles(prev => ({
      ...prev,
      [type]: { uploaded: false, processing: true }
    }));

    // Simulate AI processing
    setTimeout(() => {
      setFiles(prev => ({
        ...prev,
        [type]: { uploaded: true, processing: false }
      }));
    }, 2000);
  };

  const allFilesUploaded = files.payroll.uploaded && files.timekeeping.uploaded && files.policies.uploaded;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Screen A1: Start Payroll Setup */}
      {currentStep === 1 && (
        <div className="min-h-[600px] flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-[#B82329]" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome, Diane (HR Admin)
            </h1>
            
            <p className="text-xl text-gray-600 mb-2">
              Your payroll setup can be completed in minutes.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Let our AI configure your rules automatically.
            </p>

            <button
              onClick={() => setCurrentStep(2)}
              className="bg-[#B82329] hover:bg-[#a01f25] text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl text-lg inline-flex items-center gap-2"
            >
              Set Up Payroll With AI
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-sm text-gray-500 mt-8">
              Need help? The Payroll Copilot is available 24/7.
            </p>
          </div>
        </div>
      )}

      {/* Screen A2: Upload Files */}
      {currentStep === 2 && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Payroll Inputs</h2>
          <p className="text-gray-600 mb-8">
            Drag & drop your existing files, or click to upload.
          </p>

          <div className="space-y-4 mb-8">
            {/* Payroll Export */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:border-[#B82329] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileSpreadsheet className="w-8 h-8 text-[#B82329]" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Payroll Export (XLSX)</h3>
                    <p className="text-sm text-gray-600">Employee names, salaries, deductions</p>
                  </div>
                </div>
                
                {files.payroll.processing && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
                
                {files.payroll.uploaded && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Processed</span>
                  </div>
                )}
                
                {!files.payroll.uploaded && !files.payroll.processing && (
                  <button
                    onClick={() => handleFileUpload('payroll')}
                    className="bg-[#B82329] hover:bg-[#a01f25] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Upload File
                  </button>
                )}
              </div>
            </div>

            {/* Timekeeping Logs */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:border-[#B82329] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-[#B82329]" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Timekeeping Logs (CSV)</h3>
                    <p className="text-sm text-gray-600">Clock-in/out records, OT hours</p>
                  </div>
                </div>
                
                {files.timekeeping.processing && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
                
                {files.timekeeping.uploaded && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Processed</span>
                  </div>
                )}
                
                {!files.timekeeping.uploaded && !files.timekeeping.processing && (
                  <button
                    onClick={() => handleFileUpload('timekeeping')}
                    className="bg-[#B82329] hover:bg-[#a01f25] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Upload File
                  </button>
                )}
              </div>
            </div>

            {/* CBA & Policies */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:border-[#B82329] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-[#B82329]" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Policies & CBA (PDF)</h3>
                    <p className="text-sm text-gray-600">Holiday rules, OT policies, allowances</p>
                  </div>
                </div>
                
                {files.policies.processing && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Analyzing...</span>
                  </div>
                )}
                
                {files.policies.uploaded && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Processed</span>
                  </div>
                )}
                
                {!files.policies.uploaded && !files.policies.processing && (
                  <button
                    onClick={() => handleFileUpload('policies')}
                    className="bg-[#B82329] hover:bg-[#a01f25] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Upload File
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* AI Copilot Message */}
          {allFilesUploaded && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">AI Copilot:</p>
                  <p className="text-blue-800">
                    "I've detected 4 shift types, night diff rules, overtime multipliers, and 2 holiday policies. Converting them into payroll logic..."
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => setCurrentStep(3)}
              disabled={!allFilesUploaded}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                allFilesUploaded
                  ? "bg-[#B82329] hover:bg-[#a01f25] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Screen A3: AI-Generated Rules + Anomaly Detection */}
      {currentStep === 3 && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Review Detected Payroll Rules</h2>

          {/* AI Copilot Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">AI Copilot Summary:</p>
                <p className="text-blue-800">
                  "I've extracted 47 payroll rules from your documents. I found 3 inconsistencies you may want to review."
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Payroll Rules Detected */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Payroll Rules Detected
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Night Differential: 10%</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Overtime Multiplier: 1.25</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Rest Day OT: 1.30</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Holiday Rules: Regular / Special</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Cash Advance Policy: Allowed (payday deduction)</span>
                </div>
              </div>
            </div>

            {/* Anomalies Found */}
            <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                3 Anomalies Found
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span className="text-gray-700 text-sm">Holiday calculation mismatch (March)</span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span className="text-gray-700 text-sm">2 employees exceed allowable OT</span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span className="text-gray-700 text-sm">4 missing time logs</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="text-[#B82329] hover:text-[#a01f25] font-medium text-sm">
                  View Details →
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-lg font-semibold border-2 border-[#B82329] text-[#B82329] hover:bg-red-50 transition-colors">
                Review Fixes
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 rounded-lg font-semibold bg-[#B82329] hover:bg-[#a01f25] text-white transition-colors"
              >
                Approve Rules
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen A4: Shadow Payroll Ready → Go Live */}
      {currentStep === 4 && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Shadow Payroll Comparison</h2>

          {/* AI Copilot Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-green-900 mb-1">AI Copilot:</p>
                <p className="text-green-800">
                  "Shadow payroll completed. I matched 1,247 out of 1,250 payslips. Only 3 differences require review."
                </p>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Employee ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Old Payroll</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">PayFlow AI Payroll</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Employee 0001</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱18,500</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱18,500</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Match
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Employee 0002</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱22,300</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱22,300</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Match
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-amber-50 hover:bg-amber-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Employee 0421</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱19,500</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₱19,620</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                        <AlertTriangle className="w-4 h-4" />
                        Net Pay +₱120 (Holiday rules mismatch)
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-amber-50 hover:bg-amber-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Employee 0543</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱16,800</td>
                    <td className="px-6 py-4 text-sm text-gray-700">-</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                        <AlertTriangle className="w-4 h-4" />
                        Missing time log
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-amber-50 hover:bg-amber-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Employee 0661</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱24,100</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₱24,280</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                        <AlertTriangle className="w-4 h-4" />
                        OT variance detected
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-lg font-semibold border-2 border-[#B82329] text-[#B82329] hover:bg-red-50 transition-colors">
                Fix Anomalies
              </button>
              <button className="px-8 py-3 rounded-lg font-semibold bg-[#B82329] hover:bg-[#a01f25] text-white transition-colors shadow-lg hover:shadow-xl">
                Go Live with Guardrails
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
