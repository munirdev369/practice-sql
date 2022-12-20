import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({ baseURL: "/" });

export const getRequest = async (url: string, config: AxiosRequestConfig) => {
	try {
		const response = await api.get(url, config);
		return { data: response.data, status: response.status };
	} catch (error) {
		throw error;
	}
};
