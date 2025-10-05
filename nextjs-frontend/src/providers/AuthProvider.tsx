"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	ReactElement,
	useEffect,
} from 'react';
import { Loader } from '@/components/Loader';
import { useRouter } from 'next/navigation';

type AuthTypes = {
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
	token: string;
	setToken: (token: string) => void;
    setLogin: (token: string) => void;
    setLogout: () => void;
};

const AuthContext = createContext<AuthTypes>({} as AuthTypes);

const AuthProvider = ({children}: {children?: ReactNode | ReactElement}) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [token, setToken] = useState<string>('');
    const router = useRouter();

    const setLogin = (token: string) => {
        setToken(token);
        localStorage.setItem('token', token);
        router.push('/');
    }

    const setLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    }

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (!localToken && !token) {
            router.push('/login');
        } else {
            setToken(localToken || token);
        }
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);
		return () => clearTimeout(timer);
    }, [token]);

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				setIsLoading,
				token,
				setToken,
                setLogin,
                setLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuthProvider = () => useContext(AuthContext);

export const ProtectRoute = ({children}: {children?: ReactNode}) => {
	const {isLoading} = useAuthProvider();
	if (isLoading) return <Loader />;
	return <>{children}</>;
};

export {AuthProvider, useAuthProvider, AuthContext};
