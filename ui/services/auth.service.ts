import { Response } from 'express';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import fetchService from './fetch.service';

import { ILoginIn, IRegisterIn } from '../types/auth.types';

class AuthService {
	public loginUser({ email, password }: ILoginIn): Promise<any> {
		return fetchService.isofetch(`/auth/login`, { email, password }, 'POST');
	}

	public registerUser({
		firstName,
		lastName,
		email,
		password
	}: IRegisterIn): Promise<any> {
		return fetchService.isofetch(
			`/auth/register`,
			{ firstName, lastName, email, password },
			'POST'
		);
	}

	public checkAuthToken(authToken: string): Promise<any> {
		return fetchService.isofetch(`/auth/validate`, { authToken }, 'POST');
	}

	public saveTokens(authToken: string): Promise<any> {
		const cookies = new Cookies();
		cookies.set('authToken', authToken, { path: '/' });
		return Promise.resolve();
	}

	public logout(): void {
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

	public redirectUser(dest: string, options: { res: Response; status: number }) {
		const { res, status } = options;
		if (res) {
			res.writeHead(status || 302, { Location: dest });
			res.end();
		} else {
			if (dest[0] === '/' && dest[1] !== '/') {
				Router.push(dest);
			} else {
				window.location.href = dest;
			}
		}
	}

	public isAuthPage(page: string) {
		if (page === '/home' || page === '/register' || page === '/about') {
			return false;
		} else {
			return true;
		}
	}
}
export default new AuthService();
