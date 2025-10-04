import axios from 'axios';

import {RequestType} from '@/interfaces/api';

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
	return axios.get(url, {headers, params});
};

export const post = (props: RequestType) => {
	const {url, body, params} = props;
	const headers = getHeader(props);
	return axios.post(url, body, {headers, params});
};
