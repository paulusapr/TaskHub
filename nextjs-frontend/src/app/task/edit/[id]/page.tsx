"use client";
import React, { useEffect } from "react";
import { Formik } from 'formik';
import TaskHooks from "@/services/taskHooks";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useRouter, useParams } from "next/navigation";
import { Loader } from "@/components/Loader";
import { Status } from "@/services/enum";

const EditTaskPage = () => {
    const { token } = useAuthProvider();
    const { updateStatus, getTaskById, loading, message, singleTask } = TaskHooks(token);
    const router = useRouter();
    const params = useParams();
    const taskId = params.id; 

    const onSubmit = (values: {title: string, status: string}) => {
        updateStatus({
            ...values,
            id: taskId as string,
        });
    }

    useEffect(() => {
        if (message) {
            alert(message);
            router.push('/');
        }
    }, [message]);

    useEffect(() => {
      if (taskId) getTaskById(taskId as string);
    }, []);

    if (loading) {
      return <Loader />;
    }

    return (
        <div className="flex w-full p-10 justify-center">
            <div className="rounded-sm shadow-sm p-10 flex min-w-sm items-center gap-5 flex-col">
                <h1 className="text-3xl">Edit Task</h1>
                <div className="w-full flex flex-col">
                    <Formik
                        initialValues={{ title: singleTask?.title ?? '', status: singleTask?.status ?? 'To Do' }}
                        onSubmit={(values, { resetForm }) => {
                            onSubmit(values);
                            resetForm();
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                 <input
                                    className="border border-gray-300 rounded-sm p-2"
                                    type="text"
                                    name="title"
                                    placeholder="Name"
                                    value={values.title}
                                    onChange={handleChange}
                                />
                                <select
                                  className="border border-gray-300 rounded-sm p-2 w-full"
                                  name="status"
                                  value={values.status}
                                  onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        Select status
                                    </option>
                                    {Object.values(Status).map((val) => (
                                        <option key={val} value={val}>
                                        {val.charAt(0).toUpperCase() + val.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className="bg-blue-500 text-white rounded-sm p-2 hover:bg-blue-600 transition-colors"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default EditTaskPage;
