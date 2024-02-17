import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";
import ProfilePanel from "../components/profilePanel/ProfilePanel";
import ProfileFullScreen from "../components/profileFullScreen/ProfileFullScreen";

export default function RootLayout() {
  return (
    <div className="screen-container">
      <SideBar />
      <Outlet />
      <ProfilePanel />
      <ProfileFullScreen />
    </div>
  );
}