/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below prepares a redux connect for the component.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actions } from '#redux/account';

import { Action, State } from '#redux';
import { AnonymousState, AuthenticatedState } from '#redux/account/state';

/* ----- State Props ----- */

export type StateProps = AuthenticatedState | AnonymousState;

function mapStateToProps(state: State): StateProps {
  // separate the props for an authenticated environment
  return state.account.isAuthenticated
    ? {
        profile: state.account.profile,
        isAuthenticated: state.account.isAuthenticated
      }
    : {
        profile: state.account.profile,
        isAuthenticated: state.account.isAuthenticated
      };
}

// ---------------------------------------- //

/* ----- Dispatch Props ----- */

export interface DispatchProps {
  login: typeof actions.login;
  logout: typeof actions.logout;
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return bindActionCreators(
    {
      login: actions.login,
      logout: actions.logout
    },
    dispatch
  );
}

// ---------------------------------------- //

/* ----- Connector ----- */

export type ReduxProps = StateProps & DispatchProps;

export const Connector = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
);

export default Connector;

// ---------------------------------------- //
