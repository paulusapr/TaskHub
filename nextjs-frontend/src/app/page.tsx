"use client";
import { useEffect } from "react";
import { useAuthProvider } from "@/providers/AuthProvider";
import TaskHooks from "@/services/taskHooks";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function Home() {
  const { token, setLogout } = useAuthProvider();
  const { getListOfTask, removeTask, task, loading, message } = TaskHooks(token);
  const router = useRouter();

  useEffect(() => {
    getListOfTask();
  }, [message]);

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex justify-center p-10">
      <div className="min-w-sm flex flex-col p-10 gap-5 shadow-sm rounded-sm">
        <a className="shadow-sm rounded-sm p-2 ml-auto" href='/task/create'>Add New Task</a>
        {task.length > 0 ? <div className="grid grid-cols-3 gap-4">
          {task.map((item) => (
            <div onClick={() => router.push(`/task/edit/${item.id}`)} key={item.id} className="border p-5 rounded flex flex-col gap-3">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <span>{item.status}</span>
              <button type="button" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeTask(item.id);
              }} className="text-red-700 border">Delete</button>
            </div>
          ))}
        </div> : <div>Task is empty...</div>}
        <button className="shadow-sm rounded-sm p-2" type="button" onClick={setLogout}>Logout</button>
      </div>
    </div>
  );
}
