import { useState } from "react";
import { post } from "./api";

const AuthHooks = () => {
    const [token, setToken] = useState<string>('');

    const login = async ({email, password}: {email: string, password: string}) => {
        await post({url: '/auth/login', body: { email, password }}).then((res) => {
            if (res?.data?.token) {
                setToken(res.data.token);
            }
        });
    }

    return {
        login,
        token,
    }
}

export default AuthHooks;
