import fetch from 'isomorphic-unfetch';

import Cookies from 'universal-cookie';

class FetchService {
  public isofetch(url: string, data: object, type: string): Promise<any> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      body: JSON.stringify({ ...data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: type
    })
      .then((response: Response) => response.json())
      .then(this.handleErrors)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * This request could be initiated on client or server side, so a check must be done so
   * we can know whether to use the Docker local instance (server side request) or the
   * public facing request (client side)
   * @param url
   * @param data
   * @param type
   * @param ssr
   */
  public isofetchAuthed(
    url: string,
    data: object,
    type: string,
    ssr: boolean = false
  ): Promise<any> {
    const cookies = new Cookies();
    const token = cookies.get('token');

    return fetch(
      `${ssr ? process.env.NEXT_PUBLIC_NETWORK_API_URL : process.env.NEXT_PUBLIC_API_URL}${url}`,
      {
        body: JSON.stringify({ ...data }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        method: type
      }
    )
      .then((response: Response) => response.json())
      .then(this.handleErrors)
      .catch((error) => {
        throw error;
      });
  }

  public handleErrors(response: string): string {
    if (response === 'TypeError: Failed to fetch') {
      throw Error('Server error.');
    }
    return response;
  }
}

export default new FetchService();
