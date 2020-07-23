import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import db from '../db/models';
import config from '../config';
import { IUser } from '../types/user.types';

class Token {
  public token: string;
  public refreshToken: string;

  constructor(token?: string, refreshToken?: string) {
    if (token) {
      this.token = token;
    }
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
  }

  createToken(user: IUser) {
    this.token = jwt.sign(_.omit(user, 'password'), config.authSecret, {
      expiresIn: '30m'
    });
  }

  async createRefreshToken(userEmail: string) {
    this.refreshToken = jwt.sign({ type: 'refresh' }, config.authSecret, {
      expiresIn: '2h' // 1 hour
    });

    await this.saveRefreshToken(userEmail);

    return;
  }

  private saveRefreshToken(userEmail: string) {
    return db.users.update({ refreshToken: this.refreshToken }, { where: { email: userEmail } });
  }

  validateRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('There is no refresh token to check.');
    }

    return new Promise((res, rej) => {
      jwt.verify(refreshToken, config.authSecret, async (err: Error) => {
        if (err) {
          rej({
            code: 'refreshExpired',
            message: 'Refresh token expired - session ended.'
          });
        } else {
          try {
            const user = await db.users.findOne({ raw: true, where: { refreshToken } });
            res(user);
          } catch (e) {
            rej(e);
          }
        }
      });
    });
  }

  validateAuthToken(authToken: string) {
    return new Promise((res, rej) => {
      jwt.verify(authToken, config.authSecret, (err: Error) => {
        if (err) {
          rej();
        } else {
          res();
        }
      });
    });
  }
}

export { Token };
