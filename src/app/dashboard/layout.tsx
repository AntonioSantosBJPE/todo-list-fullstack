"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { TaskProvider } from "@/contexts/TasksContext";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <TaskProvider> {children}</TaskProvider>
    </AuthProvider>
  );
};

export default RootLayout;
