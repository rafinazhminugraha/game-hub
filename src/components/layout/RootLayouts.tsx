// ROLE: Shell that wraps every page.
// NavBar lives HERE so it renders once across all routes,
// not re-mounted every time the page changes.

import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
// ^-- fix this import path to match your actual file structure

export const RootLayouts = () => {
  return (
    // 1. RootLayouts renders NavBar once at the top level.
    //    NavBar writes to the Zustand store when hamburger is clicked.
    <div className="flex flex-col gap-8 p-6 lg:p-12 relative">
      <NavBar />

      {/* 2. Outlet renders whatever page matches the current route.
             For "/", that is HomePage. NavBar is NOT re-rendered. */}
      <Outlet />
    </div>
  );
};