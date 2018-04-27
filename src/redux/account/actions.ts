/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below contain example redux actions
 *            for basic account management.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { buildAction } from 'typesafe-actions';

import { State } from '#redux/account';

export const login = buildAction('account/LOGIN').empty();

export const success = buildAction('account/AUTH_SUCCESS').empty();

export const profile = buildAction('account/PROFILE').payload<
  NonNullable<State['profile']>
>();

export const fail = buildAction('account/AUTH_FAIL').empty();

export const logout = buildAction('account/LOGOUT').empty();
