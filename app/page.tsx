"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import MainLayout from "../components/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <header className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-100">
              Kubernetes Automation Agent
            </h1>
            <div className="flex md:hidden space-x-2">
              <button
                className="p-2 text-gray-400 hover:text-gray-100 rounded-lg hover:bg-gray-700"
                onClick={() => {
                  // We'll handle this through the MainLayout component
                  const event = new CustomEvent("toggleLeftPanel");
                  window.dispatchEvent(event);
                }}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow p-4">
          <div className="h-full flex items-center justify-center text-gray-400 text-center px-4">
            <div className="space-y-2">
              <p className="text-lg">Select a file or cluster to get started</p>
              <p className="text-sm text-gray-500">
                Use the explorer panel to browse your repositories and clusters
              </p>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
