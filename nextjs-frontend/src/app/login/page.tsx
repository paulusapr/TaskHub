"use client";
import React, { useEffect } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthHooks from "@/services/authHooks";
import { useAuthProvider } from "@/providers/AuthProvider";

const LoginSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string().required('Required'),
 });

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
                        validationSchema={LoginSchema}
                        onSubmit={(values) => onSubmit(values)}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <input
                                    className={`border ${errors.email ? 'border-red-700' : 'border-gray-300'} rounded-sm p-2`}
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email ? (
                                    <span className="text-red-700">{errors.email}</span>
                                ) : null}
                                <input
                                    className={`border ${errors.email ? 'border-red-700' : 'border-gray-300'} rounded-sm p-2`}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                {errors.password && touched.password ? (
                                    <span className="text-red-700">{errors.password}</span>
                                ) : null}
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
