"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ChatWindow from "../chat/ChatWindow";
import Explorer from "../explorer/Explorer";
import { TreeNode } from "../explorer/TreeView";

export interface MainLayoutProps {
  children?: React.ReactNode;
  onFileSelect?: (node: TreeNode | null) => void;
}

export default function MainLayout({
  children,
  onFileSelect,
}: MainLayoutProps) {
  const [leftPanelWidth, setLeftPanelWidth] = useState(300);
  const [rightPanelWidth, setRightPanelWidth] = useState(400);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsLeftPanelOpen(false);
        setIsRightPanelOpen(false);
        setIsChatExpanded(false);
      } else {
        setIsLeftPanelOpen(true);
        setIsRightPanelOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Left Panel - Explorer */}
      <div
        className={`fixed md:relative z-20 h-full transition-all duration-300 ease-in-out ${
          isLeftPanelOpen ? "left-0" : "-left-[300px] md:-left-[270px]"
        }`}
        style={{ width: `${leftPanelWidth}px` }}
      >
        <div className="h-full flex">
          <div className="flex-1 bg-gray-900 border-r border-gray-700 overflow-hidden">
            <Explorer onSelect={onFileSelect} />
          </div>
          <button
            onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
            className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 bg-gray-800 text-gray-400 hover:text-gray-100 p-1 rounded-r"
          >
            {isLeftPanelOpen ? (
              <ChevronLeftIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-grow overflow-hidden relative ${
          isChatExpanded ? "hidden" : ""
        }`}
      >
        <div className="h-full">{children}</div>

        {/* Mobile overlay when panels are open */}
        {isMobile && (isLeftPanelOpen || isRightPanelOpen) && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => {
              setIsLeftPanelOpen(false);
              setIsRightPanelOpen(false);
            }}
          />
        )}
      </div>

      {/* Right Panel - AI Agent */}
      <div
        className={`fixed md:relative z-20 h-full transition-all duration-300 ease-in-out ${
          isRightPanelOpen ? "right-0" : "-right-[400px] md:-right-[370px]"
        } ${isChatExpanded ? "fixed inset-0 w-full" : ""}`}
        style={isChatExpanded ? undefined : { width: `${rightPanelWidth}px` }}
      >
        <div className="h-full flex">
          {!isChatExpanded && (
            <button
              onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
              className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 bg-gray-800 text-gray-400 hover:text-gray-100 p-1 rounded-l"
            >
              {isRightPanelOpen ? (
                <ChevronRightIcon className="w-5 h-5" />
              ) : (
                <ChevronLeftIcon className="w-5 h-5" />
              )}
            </button>
          )}
          <div className="flex-1 bg-gray-900 border-l border-gray-700 overflow-hidden">
            <ChatWindow
              onFileSelect={onFileSelect}
              isExpanded={isChatExpanded}
              onToggleExpand={() => setIsChatExpanded(!isChatExpanded)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
