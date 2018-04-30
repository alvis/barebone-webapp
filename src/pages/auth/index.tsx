/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The following is a handler for authentication.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';

import Callback from '#auth/callback';

import GatsbyProps from '#definitions/gatsby/props';

export default class extends React.PureComponent<GatsbyProps> {
  public render(): JSX.Element {
    return (
      <React.StrictMode>
        <Callback location={this.props.location} />
      </React.StrictMode>
    );
  }
}
