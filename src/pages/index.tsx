/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The following is an example hello world page for the index.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';

import GatsbyProps from '#definitions/gatsby/props';

export default class Index extends React.PureComponent<GatsbyProps> {
  public render(): JSX.Element {
    return (
      <>
        <p>Hello World</p>
      </>
    );
  }
}
