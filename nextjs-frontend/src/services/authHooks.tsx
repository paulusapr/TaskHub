import { useState } from "react";
import { post } from "./api";

const AuthHooks = () => {
    const [token, setToken] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    const login = async ({email, password}: {email: string, password: string}) => {
        setLoading(true);
        await post({url: '/auth/login', body: { email, password }}).then((res) => {
            if (res?.data?.token) {
                setToken(res.data.token);
            }
            setLoading(false);
        });
    }

    const register = async ({name, email, password}: {name: string, email: string, password: string}) => {
        setMessage('');
        setLoading(true);
        await post({url: '/auth/register', body: { name, email, password }}).then((res) => {
            if (res?.data?.message) {
                setMessage(res.data.message);
            }
            setLoading(false);
        });
    }

    return {
        register,
        login,
        token,
        loading,
        message,
    }
}

export default AuthHooks;
