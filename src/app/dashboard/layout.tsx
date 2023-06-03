"use client";
import { AuthProvider } from "@/contexts/AuthContext";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default RootLayout;
