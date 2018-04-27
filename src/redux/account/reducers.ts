/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below contain example redux reducers
 *            for basic account management.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import auth from './auth';
// import { initialState } from './state';

import { Action, State } from './';

export const reducers = combineReducers<State, Action>({
  isAuthenticated(
    state: State['isAuthenticated'],
    action: Action
  ): State['isAuthenticated'] {
    switch (action.type) {
      case getType(actions.success):
        return true;
      case getType(actions.logout):
      case getType(actions.fail):
        return false;
      case getType(actions.login):
      default:
        return state === undefined ? auth.isAuthenticated : state;
    }
  },
  profile(state: State['profile'], action: Action): State['profile'] {
    switch (action.type) {
      case getType(actions.login):
      case getType(actions.logout):
        return null;
      case getType(actions.profile):
        return action.payload;
      case getType(actions.success):
      case getType(actions.fail):
      // the profile will be fetched via logic and delivered via the profile event
      default:
        return state === undefined ? null : state;
    }
  }
});

export default reducers;
