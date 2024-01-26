import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import api from './api';

interface FetchDataResult<T> {
	data: T;
	loading: boolean;
	error: Error | null;
	refreshData: () => void;
	setData: React.Dispatch<React.SetStateAction<T | null>>;
}


interface PostDataResultWithResponse<T, R> {
	data: R;
	loading: boolean;
	error: Error | null;
	execute: (data: T) => void;

}
interface PostDataResult<T> {
	loading: boolean;
	error: Error | null;
	execute: (data: T) => void;
}

interface PutDataResult<T> {
	loading: boolean;
	error: Error | null;
	execute: (id: number, data: T) => void;
}
interface PostRequest<T> {
	url: string;
	onComplete: () => void;
	onError: (response?: AxiosResponse) => void;
}
interface PostRequestWithResponse<T, R> {
	url: string;
	onComplete: (data: R) => void;
	onError: (response?: AxiosResponse) => void;
}
interface PutRequest<T> {
	url: string;
	onComplete: () => void;
	onError: (response?: AxiosResponse) => void;
}

interface DeleteDataResult {
	loading: boolean;
	error: Error | null;
	execute: (id: number) => void;
}

interface FetchRequest<T> {
	url: string;
	defaultValue: T | null;
	lazy?: boolean;

}

interface DeleteRequest {
	url: string;
	onComplete: () => void;
	onError: () => void;
}


export function useGet<T>(options: FetchRequest<T>): FetchDataResult<T> {
	const [data, setData] = useState<T | null>(options.defaultValue);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);

		try {
			const response: AxiosResponse<T> = await api.get(options.url);
			setData(response.data || options.defaultValue);
		} catch (error) {
			setError(error as any);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			if (!options.lazy) {
				await fetchData();
			}
		})();
		// Fetch data when the component mounts
	}, [options.url]);

	return { data: data as T, loading, error, setData, refreshData: fetchData };
}



export const usePostWithResponse = <T, R>(options: PostRequestWithResponse<T, R>): PostDataResultWithResponse<T, R> => {
	const [data, setData] = useState<R>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const postData = (data: T) => {
		setLoading(true);
		setError(null);
		api.post<R>(options.url, data).then((response) => {
			setData(response.data);
			if (options.onComplete) {
				options.onComplete(response.data);
			}
		}).catch(error => {
			if (options.onError) {
				options.onError(error.response);
			}
		}).finally(() => {
			setLoading(false);
		});
	};

	return { loading, error, execute: postData, data: data as any };
}

export const usePost = <T>(options: PostRequest<T>): PostDataResult<T> => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const postData = (data: T) => {
		setLoading(true);
		setError(null);
		api.post(options.url, data).then((response) => {
			if (options.onComplete) {
				options.onComplete();
			}
		}).catch(error => {
			if (options.onError) {
				options.onError(error.response);
			}
		}).finally(() => {
			setLoading(false);
		});
	};

	return { loading, error, execute: postData };
}




export const useDelete = (options: DeleteRequest): DeleteDataResult => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const deleteData = (id: number) => {
		setLoading(true);
		setError(null);
		api.delete(`${options.url}/${id}`).then(() => {
			if (options.onComplete) {
				options.onComplete();
			}
		}).catch(error => {
			if (options.onError) {
				options.onError();
			}
		}).finally(() => {
			setLoading(false);
		});

	};

	return { loading, error, execute: deleteData };
}
