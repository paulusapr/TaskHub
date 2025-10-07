"use client";
import React, { useEffect } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import TaskHooks from "@/services/taskHooks";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const CreateTaskSchema = Yup.object().shape({
   title: Yup.string().required('Required'),
 });

const CreateTaskPage = () => {
    const { token } = useAuthProvider();
    const { createTask, message } = TaskHooks(token);
    const router = useRouter();

    const onSubmit = (values: {title: string}) => {
        createTask(values);
    }

    useEffect(() => {
        if (message) {
            alert(message);
            router.push('/');
        }
    }, [message]);

    return (
        <div className="flex w-full p-10 justify-center">
            <div className="rounded-sm shadow-sm p-10 flex min-w-sm items-center gap-5 flex-col">
                <h1 className="text-3xl">Create New Task</h1>
                <div className="w-full flex flex-col">
                    <Formik
                        initialValues={{ title: '' }}
                        validationSchema={CreateTaskSchema}
                        onSubmit={(values, { resetForm }) => {
                            onSubmit(values);
                            resetForm();
                        }}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                 <input
                                    className={`border ${errors.title ? 'border-red-700' : 'border-gray-300'} rounded-sm p-2`}
                                    type="text"
                                    name="title"
                                    placeholder="Name"
                                    value={values.title}
                                    onChange={handleChange}
                                />
                                {errors.title && touched.title ? (
                                    <span className="text-red-700">{errors.title}</span>
                                ) : null}
                                <button
                                    className="bg-blue-500 text-white rounded-sm p-2 hover:bg-blue-600 transition-colors"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default CreateTaskPage;
