import Router from 'next/router';
import Cookies from 'universal-cookie';
import fetchService from './fetch.service';

class AuthService {
	public loginUser(email, password): Promise<any> {
		return fetchService.isofetch(`/auth/login`, { email, password }, 'POST');
	}

	public registerUser(firstName, lastName, email, password): Promise<any> {
		return fetchService.isofetch(
			`/auth/register`,
			{ firstName, lastName, email, password },
			'POST'
		);
	}

	public checkAuthToken(authToken): Promise<any> {
		return fetchService.isofetch(`/auth/validate`, { authToken }, 'POST');
	}

	public saveTokens(authToken: string): Promise<any> {
		const cookies = new Cookies();
		cookies.set('authToken', authToken, { path: '/' });
		return Promise.resolve();
	}

	public logout(): boolean {
		const cookies = new Cookies();
		cookies.remove('authToken');
		Router.push('/home');
		return;
	}

	public parseJwt(token: string) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		return JSON.parse(window.atob(base64));
	}

	public redirectUser(dest, options) {
		const { res, status } = options;
		if (res) {
			res.writeHead(status || 302, { Location: dest });
			res.end();
		} else {
			if (dest[0] === '/' && dest[1] !== '/') {
				Router.push(dest);
			} else {
				window.location = dest;
			}
		}
	}

	public isAuthPage(page) {
		if (page === '/home' || page === '/register' || page === '/about') {
			return false;
		} else {
			return true;
		}
	}
}
export default new AuthService();
