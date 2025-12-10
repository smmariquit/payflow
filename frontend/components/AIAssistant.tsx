"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, RotateCcw, AlertCircle } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Predefined responses for common questions
const predefinedResponses: Record<string, string> = {
  "how much can i withdraw": "Based on your current earnings, you can withdraw up to ₱2,500. This is 30% of your earned wages for this pay period.",
  "when is my next payday": "Your next payday is scheduled for December 16, 2025. You're currently in the pay period from December 1-15, 2025.",
  "what are my earnings": "You've earned ₱8,450 so far this cutoff period. You can access up to ₱2,500 through Early Wage Access right now.",
  "how does ewa work": "EWA (Early Wage Access) lets you withdraw money you've already earned before payday. There's a small 2.6% service fee, and the amount is automatically deducted from your next paycheck.",
  "what is the fee": "The EWA service fee is 2.6% of the amount you withdraw. For example, withdrawing ₱2,000 would have a ₱52 fee.",
  "is this safe": "Yes! PayFlow is fully secure and integrated with your company's payroll system. Your withdrawals are automatically reconciled with your salary.",
  "how fast can i get money": "Once approved, your EWA withdrawal is sent to your account instantly! You can use it right away for your needs.",
  "can i withdraw multiple times": "Yes, you can make multiple withdrawals as long as you have available earned wages. Each withdrawal is subject to the 2.6% fee.",
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your PayFlow AI assistant. Ask me about your earnings, withdrawals, or payday schedule!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPredefinedResponse = (userMessage: string): string | null => {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Check for exact or partial matches
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (normalizedMessage.includes(key) || key.includes(normalizedMessage)) {
        return response;
      }
    }
    
    // Keyword-based fallback responses
    if (normalizedMessage.includes("withdraw") || normalizedMessage.includes("access")) {
      return "You can access up to ₱2,500 of your earned wages right now. Would you like to learn more about Early Wage Access?";
    }
    if (normalizedMessage.includes("payday") || normalizedMessage.includes("salary")) {
      return "Your next payday is December 16, 2025. You've earned ₱8,450 so far this period.";
    }
    if (normalizedMessage.includes("fee") || normalizedMessage.includes("cost") || normalizedMessage.includes("charge")) {
      return "The EWA service fee is 2.6% of your withdrawal amount. This is much lower than traditional cash advance services!";
    }
    if (normalizedMessage.includes("help") || normalizedMessage.includes("support")) {
      return "I'm here to help! You can ask me about your earnings, withdrawal limits, payday schedules, or how EWA works.";
    }
    
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    // Check for predefined response first
    const predefinedResponse = getPredefinedResponse(userMessage);
    
    if (predefinedResponse) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: predefinedResponse },
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    // Fallback to API or default response
    try {
      const apiUrl = getApiBaseUrl();
      const response = await fetch(`${apiUrl}/api/v1/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm not sure about that, but I can help you with information about your earnings, withdrawals, or payday schedule. What would you like to know?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm your PayFlow AI assistant. Ask me about your earnings, withdrawals, or payday schedule!",
      },
    ]);
    setInput("");
  };

  const quickQuestions = [
    "How much can I withdraw?",
    "When is my next payday?",
    "What are my earnings?",
  ];

  return (
    <>
      {/* Floating Button - Minimal */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#B82329] hover:bg-[#a01f25] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-50 group cursor-pointer"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] bg-white sm:rounded-2xl shadow-2xl flex flex-col z-50 sm:border border-gray-200">
          {/* Header */}
          <div className="bg-[#B82329] text-white px-4 py-3 sm:rounded-t-2xl flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">PayFlow AI</h3>
                <p className="text-xs text-red-100">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetChat}
                className="text-white/80 hover:text-white transition-colors p-1 cursor-pointer"
                title="Reset chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-[#B82329] text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center mb-3">Try asking:</p>
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => sendMessage(), 100);
                    }}
                    className="w-full text-left px-3 py-2 bg-white hover:bg-red-50 active:bg-red-100 text-[#B82329] border border-gray-200 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#B82329] focus:ring-1 focus:ring-[#B82329] bg-white"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-[#B82329] hover:bg-[#a01f25] text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
