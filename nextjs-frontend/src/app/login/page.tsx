"use client";
import React, { useEffect } from "react";
import { Formik } from 'formik';
import AuthHooks from "@/services/authHooks";
import { useAuthProvider } from "@/providers/AuthProvider";

const LoginPage = () => {
    const { setLogin, token } = useAuthProvider();
    const { login, token: loginToken } = AuthHooks();
    const onSubmit = (values: {email: string, password: string}) => {
        login(values);
    }

    useEffect(() => {
        const localToken = token || loginToken;
        if (localToken) {
            setLogin(localToken);
        }
    }, [loginToken, token]);

    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="rounded-sm shadow-sm p-10 flex min-w-sm items-center gap-5 flex-col">
                <h1 className="text-3xl">Login</h1>
                <div className="w-full flex flex-col">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => onSubmit(values)}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <input
                                    className="border border-gray-300 rounded-sm p-2"
                                    type="text"
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
                                    Login
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="text-sm">
                    {`Don't have an account?`} <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
