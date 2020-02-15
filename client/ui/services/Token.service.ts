import { NextPageContext } from 'next/types';

import Cookies from 'universal-cookie';

import FetchService from '../services/Fetch.service';
import NavService from '../services/Nav.service';

class TokenService {
	public saveToken(token: string) {
		const cookies = new Cookies();
		cookies.set('token', token, { path: '/' });
		return Promise.resolve();
	}

	public checkAuthToken(token: string): Promise<any> {
		return FetchService.isofetchAuthed(`/auth/validate`, { token }, 'POST');
	}

	public async authenticateTokenSsr(ctx: NextPageContext) {
		const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
		const token = cookies.get('token');

		const response = await this.checkAuthToken(token);
		if (!response.success) {
			const navService = new NavService();
			navService.redirectUser('/', ctx);
		}
	}
}

export default TokenService;
