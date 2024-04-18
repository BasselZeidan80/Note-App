import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
export default function Layout() {
  return (
    <>
      <div className="bg-light w-100 p-2 text-dark text-center fixed-top">
        Notes App :
      </div>
      <Sidebar />
      <Outlet />
    </>
  );
}
