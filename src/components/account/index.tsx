/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   This is an example component for handling user profile.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';

import connect from './connector';

import { ReduxProps } from './connector';

interface ComponentProps {
  greeting?: string;
}

type Props = ComponentProps & ReduxProps;

export class Account extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    greeting: 'Welcome back'
  };

  public render(): JSX.Element {
    return this.props.isAuthenticated ? (
      <>
        <p>
          {this.props.greeting}:{' '}
          {this.props.profile ? this.props.profile.name : ''}
        </p>
        <div>
          <button onClick={this.props.logout}>Log out</button>
        </div>
      </>
    ) : (
      <div>
        <button onClick={this.props.login}>Log in</button>
      </div>
    );
  }
}

export const ConnectedAccount = connect(Account);

export default ConnectedAccount;
