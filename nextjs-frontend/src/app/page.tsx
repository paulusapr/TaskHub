"use client";
import { useEffect } from "react";
import { useAuthProvider } from "@/providers/AuthProvider";
import TaskHooks from "@/services/taskHooks";

export default function Home() {
  const { token, setLogout } = useAuthProvider();
  const { getListOfTask, task, loading } = TaskHooks(token);

  useEffect(() => {
    getListOfTask();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button type="button" onClick={setLogout}>Logout</button>
    </div>
  );
}
