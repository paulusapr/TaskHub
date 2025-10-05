"use client";
import React, { useEffect } from "react";
import { Formik } from 'formik';
import AuthHooks from "@/services/authHooks";

const RegisterPage = () => {
    const { register, message } = AuthHooks();

    const onSubmit = (values: {name: string, email: string, password: string}) => {
        register(values);
    }

    useEffect(() => {
        if (message) {
            alert(message);
        }
    }, [message]);

    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="rounded-sm shadow-sm p-10 flex min-w-sm items-center gap-5 flex-col">
                <h1 className="text-3xl">Register</h1>
                <div className="w-full flex flex-col">
                    <Formik
                        initialValues={{ name: '', email: '', password: '' }}
                        onSubmit={(values, { resetForm }) => {
                            onSubmit(values);
                            resetForm();
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                 <input
                                    className="border border-gray-300 rounded-sm p-2"
                                    type="name"
                                    name="name"
                                    placeholder="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <input
                                    className="border border-gray-300 rounded-sm p-2"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="border border-gray-300 rounded-sm p-2"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="bg-blue-500 text-white rounded-sm p-2 hover:bg-blue-600 transition-colors"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="text-sm">
                    {`Already have account?`} <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
