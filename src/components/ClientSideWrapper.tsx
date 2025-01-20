"use client"; // Mark this as a Client Component

import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import Sidebar from "@/components/Sidebar";

export default function ClientSideWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button (Fixed Below PageHeader) */}
      <div className=" lg:hidden top-24 left-0 right-0 bg-white z-50 p-4">
        <div className=" flex justify-between items-center">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="bg-orange-500 text-white p-2 rounded-lg"
          >
            <CiMenuBurger size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar (Collapsible on Small Screens) */}
      <div
        className={`fixed lg:static inset-y-0 right-0 w-80 lg:w-full bg-white p-6 lg:p-0 transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
        style={{ overflowY: "auto" }} // Enable vertical scrolling
      >
        {/* Close Button for Small Screens */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-orange-500"
        >
          ✕
        </button>

        {/* Sidebar Component */}
        <Sidebar />
      </div>

      {/* Main Content */}
      {children}
    </>
  );
}