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
import auth from '#redux/account/auth';

import { Action, State } from '#redux';

/* ----- State Props ----- */

export interface StateProps {
  handleAuthentication: typeof auth.handleAuthentication;
}

function mapStateToProps(state: State): StateProps {
  return {
    handleAuthentication: auth.handleAuthentication
  };
}

// ---------------------------------------- //

/* ----- Dispatch Props ----- */

export interface DispatchProps {
  success: typeof actions.success;
  fail: typeof actions.fail;
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return bindActionCreators(
    {
      success: actions.success,
      fail: actions.fail
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
