import { useState } from "react";

export default function ResponsiveExample() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Topbar */}
      <header className="lg:hidden flex items-center justify-between h-16 px-4 border-b bg-white">
        <h1 className="font-semibold text-lg">Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 border rounded"
        >
          Menu
        </button>
      </header>

      <div className="lg:grid lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 w-60 bg-white border-r z-50 transform transition-transform
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0
          `}
        >
          <div className="h-16 flex items-center px-4 border-b font-bold">
            Logo
          </div>

          <nav className="p-4 space-y-2">
            <a className="block px-3 py-2 rounded hover:bg-gray-100">Home</a>
            <a className="block px-3 py-2 rounded hover:bg-gray-100">
              Projects
            </a>
            <a className="block px-3 py-2 rounded hover:bg-gray-100">
              Settings
            </a>
          </nav>
        </aside>

        {/* Overlay (mobile only) */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 lg:hidden"
          />
        )}

        {/* Main Section */}
        <div className="flex flex-col min-h-screen">
          {/* Desktop Header */}
          <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b bg-white">
            <h1 className="font-semibold text-lg">Dashboard</h1>
            <div>User</div>
          </header>

          {/* Main Content */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Page Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-gray-500">Your performance summary</p>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="p-4 bg-white rounded-lg border shadow-sm"
                >
                  <h3 className="text-sm text-gray-500">Metric</h3>
                  <p className="text-xl font-semibold mt-2">123</p>
                </div>
              ))}
            </div>

            {/* Content Section */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
                Main Content Area
              </div>

              <div className="bg-white p-6 rounded-lg border">Side Widget</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
