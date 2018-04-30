/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below is an example component handling
 *            a callback return from auth0.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';

import connect from './connector';

import { Auth0Error } from 'auth0-js';
import { Location } from 'history';
import { ReduxProps } from './connector';

interface ComponentProps {
  location: Location;
}

type Props = ComponentProps & ReduxProps;

interface NormalState {
  stage: 'init' | 'processing' | 'success' | 'cancelled';
}

interface ErrorState {
  stage: 'failure';
  error: string;
}

type State = NormalState | ErrorState;

export class Callback extends React.Component<Props, State> {
  state: State = {
    stage: 'init'
  };

  public componentDidMount(): void {
    this.setState({
      stage: 'processing'
    });
  }

  public async componentDidUpdate(): Promise<void> {
    switch (this.state.stage) {
      case 'processing':
        try {
          const result = await this.props.handleAuthentication();
          if (result) {
            this.setState({
              stage: 'success'
            });
          } else {
            this.setState({
              stage: 'cancelled'
            });
          }
        } catch (error) {
          this.setState({
            stage: 'failure',
            error: (error as Auth0Error).errorDescription
          });
        }
        break;
      case 'cancelled':
      case 'success':
        // send a success message
        this.props.success();
        break;
      case 'failure':
        // send a failure message
        this.props.fail();
        break;
      default:
      // do nothing and show error message otherwise
    }
  }

  public render(): JSX.Element {
    switch (this.state.stage) {
      case 'success':
        return <>Success! Redirecting...</>;
      case 'failure':
        return (
          <>
            Something went wrong. Here is the error message: {this.state.error}
          </>
        );
      case 'processing':
      case 'init':
      default:
        return <>Loading...</>;
    }
  }
}

export const ConnectedCallback = connect(Callback);

export default ConnectedCallback;
