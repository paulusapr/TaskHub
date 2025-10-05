import { useState } from "react";
import { TaskType } from "@/interfaces/task";
import { get, post, remove, put } from "./api";

const TaskHooks = (token: string) => {
    const [task, setTask] = useState<TaskType[]>([]);
    const [singleTask, setSingleTask] = useState<TaskType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

   const updateStatus = async ({id, title, status}: {id: string, title: string, status: string}) => {
        setLoading(true);
        setMessage('');
        await put({url: `/tasks/update/${id}`, token, body: { title, status }}).then((res) => {
            if (res?.data?.message) {
                setMessage(res.data.message);
            }
            setLoading(false);
        });
   }

    const getTaskById = async (id: string) => {
        setLoading(true);
        await get({url: `/tasks/single/${id}`, token}).then((res) => {
            if (res?.data?.data) {
                setSingleTask(res.data.data);
            }
            setLoading(false);
        });
    }

    const getListOfTask = async () => {
        setLoading(true);
        await get({url: '/tasks/all', token}).then((res) => {
            if (res?.data?.data) {
                setTask(res.data.data);
            }
            setLoading(false);
        });
    }

    const createTask = async ({title}: {title: string}) => {
        setLoading(true);
        setMessage('');
        await post({url: '/tasks/create', token, body: { title }}).then((res) => {
            if (res?.data?.message) {
                setMessage(res.data.message);
            }
            setLoading(false);
        });
    }

    const removeTask = async (id: string) => {
        setLoading(true);
        setMessage('');
        await remove({url: `/tasks/delete/${id}`, token}).then((res) => {
            if (res?.data?.message) {
                setMessage(res.data.message);
            }
            setLoading(false);
        });
    }

    return {
        task,
        singleTask,
        getListOfTask,
        createTask,
        updateStatus,
        removeTask,
        getTaskById,
        loading,
        message,
    }
}

export default TaskHooks;
