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
  const [showAnomalyDetails, setShowAnomalyDetails] = useState(false);
  const [showFixWizard, setShowFixWizard] = useState(false); // Review Fixes modal
  const [showFixAnomaliesModal, setShowFixAnomaliesModal] = useState(false); // Step 4 Fix Anomalies modal
  const [anomaliesResolved, setAnomaliesResolved] = useState(false);
  const [selectedFixes, setSelectedFixes] = useState<{ holiday: string; ot: string; timelogs: string }>({ holiday: "adjust-rate", ot: "notify-hr", timelogs: "request-missing" });
  const [showLaunch, setShowLaunch] = useState(false); // ribbon animation overlay
  const [showSuccess, setShowSuccess] = useState(false);
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
              Need help? HomeCredit Payroll AI is available 24/7.
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
                  <p className="font-semibold text-blue-900 mb-1">HomeCredit AI:</p>
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
                <p className="font-semibold text-blue-900 mb-1">HomeCredit AI Summary:</p>
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
                {anomaliesResolved ? 'No Anomalies Remaining' : '3 Anomalies Found'}
              </h3>
              {!anomaliesResolved ? (
                <>
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
                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-4">
                    <button onClick={() => setShowAnomalyDetails(true)} className="text-[#B82329] hover:text-[#a01f25] font-medium text-sm">
                      View Details →
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-700">All detected anomalies have been resolved with your selected fixes.</p>
              )}
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
              <button
                onClick={() => { if (!anomaliesResolved) setShowFixWizard(true); }}
                disabled={anomaliesResolved}
                className={`px-6 py-3 rounded-lg font-semibold border-2 transition-colors ${anomaliesResolved ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-[#B82329] text-[#B82329] hover:bg-red-50'}`}
              >
                Review Fixes
              </button>
              <button
                onClick={() => { setAnomaliesResolved(false); setCurrentStep(4); }}
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
                <p className="font-semibold text-green-900 mb-1">HomeCredit AI:</p>
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
                  <tr className={anomaliesResolved ? "bg-white hover:bg-gray-50" : "bg-amber-50 hover:bg-amber-100"}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Employee 0421</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱19,500</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₱19,620</td>
                    <td className="px-6 py-4">
                      {anomaliesResolved ? (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                          <AlertTriangle className="w-4 h-4" />
                          Net Pay +₱120 (Holiday rules mismatch)
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className={anomaliesResolved ? "bg-white hover:bg-gray-50" : "bg-amber-50 hover:bg-amber-100"}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Employee 0543</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱16,800</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{anomaliesResolved ? '₱16,800' : '-'}</td>
                    <td className="px-6 py-4">
                      {anomaliesResolved ? (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                          <AlertTriangle className="w-4 h-4" />
                          Missing time log
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className={anomaliesResolved ? "bg-white hover:bg-gray-50" : "bg-amber-50 hover:bg-amber-100"}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Employee 0661</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₱24,100</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₱24,280</td>
                    <td className="px-6 py-4">
                      {anomaliesResolved ? (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                          <AlertTriangle className="w-4 h-4" />
                          OT variance detected
                        </span>
                      )}
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
              <button onClick={() => setShowFixAnomaliesModal(true)} className="px-6 py-3 rounded-lg font-semibold border-2 border-[#B82329] text-[#B82329] hover:bg-red-50 transition-colors">
                Fix Anomalies
              </button>
              <button
                className="px-8 py-3 rounded-lg font-semibold bg-[#B82329] hover:bg-[#a01f25] text-white transition-colors shadow-lg hover:shadow-xl"
                onClick={() => {
                  setShowLaunch(true);
                  setTimeout(() => {
                    setShowLaunch(false);
                    setShowSuccess(true);
                  }, 1600);
                }}
              >
                Go Live with Guardrails
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anomaly Details Modal */}
      {showAnomalyDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Anomalies Details</h3>
              <button onClick={() => setShowAnomalyDetails(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-medium">Holiday calculation mismatch (March)</p>
                <p className="text-gray-600">Detected difference between policy and applied multiplier. Suggested fix: adjust rate mapping to Regular/Special holiday rules.</p>
              </div>
              <div>
                <p className="font-medium">2 employees exceed allowable OT</p>
                <p className="text-gray-600">Suggested fix: notify HR and cap OT multiplier to 1.25 beyond threshold.</p>
              </div>
              <div>
                <p className="font-medium">4 missing time logs</p>
                <p className="text-gray-600">Suggested fix: request missing logs from employees; mark shifts for review.</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setShowAnomalyDetails(false)} className="px-4 py-2 bg-gray-900 text-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Review Fixes Wizard Modal */}
      {showFixWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Review Fixes</h3>
              <button onClick={() => setShowFixWizard(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Holiday calculation mismatch</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="holiday-fix" checked={selectedFixes.holiday === 'adjust-rate'} onChange={() => setSelectedFixes(s => ({...s, holiday: 'adjust-rate'}))} />
                    Adjust rate mapping (Regular/Special)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="holiday-fix" checked={selectedFixes.holiday === 'flag-review'} onChange={() => setSelectedFixes(s => ({...s, holiday: 'flag-review'}))} />
                    Flag for manual review
                  </label>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">OT limit exceeded</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="ot-fix" checked={selectedFixes.ot === 'notify-hr'} onChange={() => setSelectedFixes(s => ({...s, ot: 'notify-hr'}))} />
                    Notify HR and cap multiplier
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="ot-fix" checked={selectedFixes.ot === 'allow-exception'} onChange={() => setSelectedFixes(s => ({...s, ot: 'allow-exception'}))} />
                    Allow exception for this cycle
                  </label>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Missing time logs</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="logs-fix" checked={selectedFixes.timelogs === 'request-missing'} onChange={() => setSelectedFixes(s => ({...s, timelogs: 'request-missing'}))} />
                    Request missing logs (auto email)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="logs-fix" checked={selectedFixes.timelogs === 'estimate-hours'} onChange={() => setSelectedFixes(s => ({...s, timelogs: 'estimate-hours'}))} />
                    Estimate hours based on pattern
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-between">
              <button onClick={() => setShowFixWizard(false)} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg">Cancel</button>
              <button onClick={() => { setShowFixWizard(false); setAnomaliesResolved(true); }} className="px-4 py-2 bg-[#B82329] text-white rounded-lg">Apply Selected Fixes</button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4 Fix Anomalies Modal (different from Review Fixes) */}
      {showFixAnomaliesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Fix Anomalies</h3>
              <button onClick={() => setShowFixAnomaliesModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-4 text-sm text-gray-700">
              <p>Select a quick action to resolve all outstanding anomalies:</p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gray-100 rounded-lg text-left">Auto-apply AI recommended fixes</button>
                <button className="w-full px-4 py-2 bg-gray-100 rounded-lg text-left">Notify HR for approvals and apply caps</button>
                <button className="w-full px-4 py-2 bg-gray-100 rounded-lg text-left">Mark anomalies for next cycle review</button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-between">
              <button onClick={() => setShowFixAnomaliesModal(false)} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg">Cancel</button>
              <button onClick={() => { setShowFixAnomaliesModal(false); setAnomaliesResolved(true); }} className="px-4 py-2 bg-[#B82329] text-white rounded-lg">Apply Fixes</button>
            </div>
          </div>
        </div>
      )}
      {/* Launch Animation Overlay (centered ribbon.png zoom-out) */}
      {showLaunch && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <style>{`
            @keyframes bgFlash {
              0% { opacity: 0; }
              50% { opacity: 0.4; }
              100% { opacity: 0; }
            }
            @keyframes ribbonZoomOut {
              0% { transform: scale(0.8); opacity: 0; }
              10% { opacity: 1; }
              60% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(2.4); opacity: 0; }
            }
          `}</style>
          <div className="absolute inset-0 bg-amber-200 opacity-0 animate-[bgFlash_1000ms_ease-in-out]" />
          <div className="fixed inset-0 flex items-center justify-center">
            {/* Centered payflow image zooming out */}
            <img
              src="/payflow.png"
              alt="Payflow Ribbon"
              className="w-[360px] h-[180px] object-contain animate-[ribbonZoomOut_1400ms_ease-in-out_forwards]"
            />
          </div>
        </div>
      )}

      {/* Success Screen Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-gray-200 p-8 text-center animate-in fade-in zoom-in-95">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Go Live Successful</h3>
            <p className="text-gray-700 mb-6">Guardrails enabled. Your payroll is now running with AI protection.</p>
            <button className="px-6 py-3 rounded-lg font-semibold bg-[#B82329] hover:bg-[#a01f25] text-white" onClick={() => { setShowSuccess(false); }}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
