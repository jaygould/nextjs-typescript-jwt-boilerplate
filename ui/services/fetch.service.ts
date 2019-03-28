import fetch from 'isomorphic-unfetch';
import config from '../config';

class FetchService {
	public isofetch(url, data, type): Promise<any> {
		return fetch(`${config.apiUrl}${url}`, {
			body: JSON.stringify({ ...data }),
			headers: config.configHeaders,
			method: type
		})
			.then((response: Response) => response.json())
			.then(this.handleErrors)
			.catch(error => {
				throw error;
			});
	}

	public handleErrors(response: any): object {
		if (response === 'TypeError: Failed to fetch') {
			throw Error('Server error.');
		}
		return response;
	}
}

export default new FetchService();
