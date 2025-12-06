"use client";

import { useState, useEffect } from "react";
import EmployeeView from "@/components/EmployeeView";
import EmployerView from "@/components/EmployerView";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check screen size on mount and when window resizes
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLoading(false);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B82329] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PayFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isMobile ? <EmployeeView /> : <EmployerView />}
    </div>
  );
}

