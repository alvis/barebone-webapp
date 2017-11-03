/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below provides a universal layout for all pages.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';
import Helmet from 'react-helmet';

import '../semantic/dist/semantic.css';

interface LayoutProps {
  children(): JSX.Element;
}

export default class Layout extends React.Component<LayoutProps, void> {
  public render(): JSX.Element {
    return (
      <>
        <Helmet />
        <header />
        {this.props.children()}
      </>
    );
  }
}
