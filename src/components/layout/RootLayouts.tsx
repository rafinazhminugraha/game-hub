/**
 * Root layout component that provides a consistent shell for all pages.
 * Includes the persistent NavBar and an Outlet for nested routes.
 */

import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export const RootLayouts = () => {
  return (
    <div className="flex flex-col gap-8 p-6 lg:p-12 relative">
      <NavBar />
      <Outlet />
    </div>
  );
};