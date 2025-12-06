"use client";

import { useState, useEffect } from "react";
import QRCodeSVG from "react-qr-code";
import { X, Smartphone } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

export default function MobileHandoff() {
  const [showModal, setShowModal] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchLanIp = async () => {
    setLoading(true);
    try {
      const apiUrl = getApiBaseUrl();
      const response = await fetch(`${apiUrl}/api/v1/system/ip`);
      const data = await response.json();
      setQrUrl(data.frontend_url);
    } catch (error) {
      console.error("Error fetching LAN IP:", error);
      setQrUrl("http://localhost:3000");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    if (!qrUrl) {
      fetchLanIp();
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
      >
        <Smartphone className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-700">Connect Mobile</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Smartphone className="w-8 h-8 text-[#B82329]" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Scan to Demo on Device
              </h2>
              <p className="text-gray-600 mb-6">
                Open your phone&apos;s camera and scan this QR code
              </p>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 inline-block">
                {loading ? (
                  <div className="w-64 h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B82329]"></div>
                  </div>
                ) : qrUrl ? (
                  <QRCodeSVG value={qrUrl} size={256} />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center text-gray-400">
                    Failed to generate QR code
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Ensure your phone is on the same Wi-Fi network
              </p>

              {qrUrl && (
                <p className="text-xs text-gray-400 mt-2 font-mono break-all">
                  {qrUrl}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
