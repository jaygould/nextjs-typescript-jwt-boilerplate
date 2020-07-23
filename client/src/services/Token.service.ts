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

  public deleteToken() {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    return;
  }

  public checkAuthToken(token: string, ssr: boolean): Promise<any> {
    return FetchService.isofetchAuthed(`/auth/validate`, { token }, 'POST', ssr);
  }

  /**
   * Runs on both client and server side in the getInitialProps static.
   * This decides whether the request is from client or server, which
   * is important as the URL's will be different due to the Docker
   * container network
   * @param ctx
   */
  public async authenticateTokenSsr(ctx: NextPageContext) {
    const ssr = ctx.req ? true : false;
    const cookies = new Cookies(ssr ? ctx.req.headers.cookie : null);
    const token = cookies.get('token');

    const response = await this.checkAuthToken(token, ssr);
    if (!response.success) {
      const navService = new NavService();
      this.deleteToken();
      navService.redirectUser('/?l=t', ctx);
    }
  }
}

export default TokenService;
