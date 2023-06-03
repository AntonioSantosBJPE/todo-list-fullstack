"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const Dashboard = () => {
  const { logoutUserAuth } = useContext(AuthContext);
  return (
    <>
      <h1>Página Dashboard</h1>
      <button
        onClick={logoutUserAuth}
        className="w-24 bg-slate-700 text-red-400"
      >
        Logout{" "}
      </button>
    </>
  );
};
export default Dashboard;
