/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below provide tools for authentication.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import auth0 from 'auth0-js';
import { AES, enc, SHA1 } from 'crypto-js';
import store from 'store';

/** for an encryption plugin for store */
interface Encryptor {
  get(fn: typeof store.get, key: string): ReturnType<typeof store.get>;
  set(
    fn: typeof store.set,
    key: string,
    value: any
  ): ReturnType<typeof store.set>;
}

// take the api variables
const {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_API,
  AUTH0_REDIRECT
} = process.env;

// check the completeness of the environment variables
if (
  AUTH0_DOMAIN === undefined ||
  AUTH0_CLIENT_ID === undefined ||
  AUTH0_API === undefined ||
  AUTH0_REDIRECT === undefined
) {
  throw new Error('some enviroment variables for Auth0 are missing');
}

const scopes = ['email']; // a list of scopes to be requested

const auth0Options = {
  domain: AUTH0_DOMAIN, // an auth0 domain where the login procedure happens
  clientID: AUTH0_CLIENT_ID, // the client ID of the Auto0 application
  audience: AUTH0_API, // the API address where the app will talk to
  redirectUri: AUTH0_REDIRECT // the URI where auth0 will redirect the browser to
};

// the key for encrypting keys and values stored in the unsecured store
const ENCRYPTION_KEY = SHA1(JSON.stringify(auth0Options)).toString();

export default class Auth {
  // initialise the auth0 instance
  private auth0: auth0.WebAuth = new auth0.WebAuth({
    ...auth0Options,
    responseType: 'token id_token',
    scope: ['openid', 'profile', ...scopes].join(' ')
  });

  // create a memory store
  private cache: Map<string, any> = new Map();

  // setup a timer for token renewal
  private tokenRenewalTimeout: NodeJS.Timer;

  constructor() {
    // encrypt all the data stored
    store.addPlugin(this.secureStorage.bind(this));

    // bind the functions for prop mapping
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);

    // schedule a token renewal
    this.scheduleTokenRenewal();
  }

  /** get access token  */
  public get accessToken(): string | null {
    return store.get('access_token');
  }

  /** get expiresAt */
  public get expiresAt(): number {
    const expiresAt = store.get('expires_at');

    return expiresAt ? Number(expiresAt) : 0;
  }

  /** get id token  */
  public get idToken(): string | null {
    return store.get('id_token');
  }

  /** check if the current session is active */
  public get isAuthenticated(): boolean {
    return (
      this.idToken !== null &&
      this.accessToken !== null &&
      new Date().getTime() < this.expiresAt
    );
  }

  /** get grantedScopes */
  public get grantedScopes(): string[] {
    const grantedScopes = store.get('scopes');

    return grantedScopes ? JSON.parse(grantedScopes) : [];
  }

  /** get a user profile from auth0  */
  public async getProfile(): Promise<auth0.Auth0UserProfile | null> {
    const accessToken = this.accessToken;

    if (accessToken && this.isAuthenticated) {
      // use the accessToken to read the profile
      return new Promise<auth0.Auth0UserProfile>((resolve, reject): void => {
        this.auth0.client.userInfo(accessToken, (error, profile): void => {
          if (error) {
            reject(error);
          } else {
            resolve(profile);
          }
        });
      });
    } else {
      return null;
    }
  }

  /**
   * handle the hash passed to the call back page after authentication
   * @return indicate whether the session is set successfully
   */
  public async handleAuthentication(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject): void => {
      this.auth0.parseHash((error, authResult) => {
        if (error) {
          reject(error);
        } else {
          if (authResult && authResult.accessToken && authResult.idToken) {
            try {
              this.setSession(authResult);
              resolve(true);
            } catch (error) {
              reject(error);
            }
          } else {
            resolve(false);
          }
        }
      });
    });
  }

  /** redirect the browser to the auth0 authentication process */
  public login(state?: string): void {
    this.auth0.authorize({ state });
  }

  /** logout current session */
  public logout(): void {
    // clear everything
    store.clearAll();

    // remove any previous timeout
    clearTimeout(this.tokenRenewalTimeout);
  }

  /** renew all tokens to extends its expiry time */
  public renewToken(): void {
    this.auth0.checkSession({}, (error, authResult) => {
      if (error) {
        throw error;
      } else {
        this.setSession(authResult);
      }
    });
  }

  private scheduleTokenRenewal(): void {
    // remove any previous timeout
    clearTimeout(this.tokenRenewalTimeout);

    const delay = this.expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }

  /** create a plugin for store to encrypt/decrypt all the message through it */
  private secureStorage(): Encryptor {
    const get = (
      fn: typeof store.get,
      key: string
    ): ReturnType<typeof store.get> => {
      // try the cache first, if not availanle, try again to obtain the content in the storage
      let value = this.cache.get(key);

      if (value) {
        return value;
      } else {
        value = fn(SHA1(key, ENCRYPTION_KEY).toString());

        return value
          ? JSON.parse(AES.decrypt(value, ENCRYPTION_KEY).toString(enc.Utf8))
          : null;
      }
    };

    const set = (
      fn: typeof store.set,
      key: string,
      value: any
    ): ReturnType<typeof store.set> => {
      // store the value in memory cache
      this.cache.set(key, value);

      // encrypt it and store it in the store
      return fn(
        SHA1(key, ENCRYPTION_KEY).toString(),
        AES.encrypt(JSON.stringify(value), ENCRYPTION_KEY).toString()
      );
    };

    return { get, set };
  }

  /**
   * set the tokens to the storage
   * @param authResult the result returned from auth0
   */
  private setSession(authResult: auth0.Auth0DecodedHash): void {
    const { accessToken, idToken, expiresIn } = authResult;

    // check if there is any missing bit
    if (
      typeof accessToken !== 'string' ||
      typeof idToken !== 'string' ||
      typeof expiresIn !== 'number'
    ) {
      throw new Error(
        `There is something wrong with the hash from auth0: ${JSON.stringify(
          authResult
        )}`
      );
    }

    const grantedScopes = authResult.scope || scopes || '';

    // store the result
    store.set('scopes', JSON.stringify(grantedScopes).split(' '));
    store.set('access_token', accessToken);
    store.set('id_token', idToken);
    store.set(
      'expires_at',
      JSON.stringify(expiresIn * 1000 + new Date().getTime())
    );

    // schedule a token renewal
    this.scheduleTokenRenewal();
  }
}
