/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below exports utilities for building
 *            global actions for all apps.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

// import { push } from 'react-router-redux'
import { buildAction } from 'typesafe-actions';

export const back = buildAction('back').empty();

export const redirect = buildAction('redirect').payload<string>();

// export const redirect= buildAction('')
