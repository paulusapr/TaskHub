import { useState } from "react";
import { TaskType } from "@/interfaces/task";
import { get } from "./api";

const TaskHooks = (token: string) => {
    const [task, setTask] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getListOfTask = async () => {
        setLoading(true);
        await get({url: '/tasks', token}).then((res) => {
            if (res?.data?.data) {
                setTask(res.data.data);
            }
            setLoading(false);
        });
    }

    return {
        task,
        getListOfTask,
        loading,
    }
}

export default TaskHooks;
