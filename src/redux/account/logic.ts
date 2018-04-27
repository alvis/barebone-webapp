/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below provides a redux-logic
 *            middleware for account management.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { push } from 'react-router-redux';
import { createLogic } from 'redux-logic';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import auth from './auth';

import { Action as RootAction, State as RootState } from '#redux';

export const login = createLogic<RootState>({
  type: getType(actions.login),

  process: (): void => {
    auth.login();
  }
});

export const success = createLogic<RootState>({
  type: getType(actions.success),

  process: async ({ getState }, dispatch, done): Promise<void> => {
    const state: RootState = getState();

    try {
      // load the profile
      const profile = await auth.getProfile();
      if (profile) {
        dispatch(actions.profile(profile));
      }
    } catch (error) {
      // dispatch(actions.profile(null));
    }

    // return to previous page
    dispatch(
      push(
        state.router.history.length
          ? // go back to the last visited page
            state.router.history[state.router.history.length - 2]
          : // or homepage if the last visited page is unknown
            '/'
      )
    );

    // finish the process
    done();
  }
});

export const fail = createLogic<RootState>({
  type: getType(actions.fail),

  process: async ({ getState }): Promise<RootAction> => {
    const state: RootState = getState();

    return push(
      state.router.history.length
        ? // go back to the last visited page
          state.router.history[state.router.history.length - 1]
        : // or homepage if the last visited page is unknown
          '/'
    );
  }
});

export const logout = createLogic<RootState>({
  type: getType(actions.logout),

  process: (): RootAction => {
    auth.logout();

    return push('/');
  }
});
