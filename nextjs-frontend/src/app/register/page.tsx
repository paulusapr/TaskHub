"use client";
import React, { useEffect } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthHooks from "@/services/authHooks";

const RegisterSchema = Yup.object().shape({
   name: Yup.string().required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string().required('Required'),
 });

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
                        validationSchema={RegisterSchema}
                        onSubmit={(values, { resetForm }) => {
                            onSubmit(values);
                            resetForm();
                        }}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                 <input
                                    className={`border ${errors.name ? 'border-red-700' : 'border-gray-300'} rounded-sm p-2`}
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {errors.name && touched.name ? (
                                    <span className="text-red-700">{errors.name}</span>
                                ) : null}
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
                                    className={`border ${errors.password ? 'border-red-700' : 'border-gray-300'} rounded-sm p-2`}
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
