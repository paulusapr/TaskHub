import axios from 'axios';
import {RequestType} from '@/interfaces/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getHeader = (props: RequestType) => {
	const {token, headers} = props;
	const defaultHeaders = {
		...{'Content-Type': 'application/json'},
		...(token ? {Authorization: `Bearer ${token}`} : {}),
		...(headers || {}),
	};
	return defaultHeaders;
};

export const get = (props: RequestType) => {
	const {url, params} = props;
	const headers = getHeader(props);
	return axios.get(API_BASE_URL+url, {headers, params});
};

export const post = (props: RequestType) => {
	const {url, body, params} = props;
	const headers = getHeader(props);
	return axios.post(API_BASE_URL+url, body, {headers, params});
};

export const put = (props: RequestType) => {
	const {url, body, params} = props;
	const headers = getHeader(props);
	return axios.put(API_BASE_URL+url, body, {headers, params});
};

export const remove = (props: RequestType) => {
	const {url, params} = props;
	const headers = getHeader(props);
	return axios.delete(API_BASE_URL+url, {headers, params});
};
