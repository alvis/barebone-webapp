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
import Helmet from 'react-helmet';

import GatsbyProps from '#definitions/gatsby/props';

export interface GraphQL {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default class Index extends React.PureComponent<GatsbyProps<GraphQL>> {
  // define a const element here to avoid the expensive creation in the rendering procedure
  private Meta: JSX.Element = (
    <Helmet title={this.props.data.site.siteMetadata.title} />
  );

  public render(): JSX.Element {
    return (
      <>
        {this.Meta}
        <p>Hello World</p>
      </>
    );
  }
}
