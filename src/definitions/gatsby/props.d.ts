/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below provides the definition of the
 *            component props supplied to a gatsby page or app.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';

import { History, Location } from 'history';

/** The common props suppied to a gatsby page or app */
export interface GatsbyCommonProps {
  history: History;
  location: Location;
  match: {
    path: string;
    url: string;
    params: object;
    isExact: boolean;
  };
  page: true;
  pageResources: {
    component: React.ClassicComponent;
    json: {
      pathContext: object;
    };
    layout: React.ClassicComponent;
    page: {
      componentChunkName: string;
      jsonName: string;
      layout: string;
      layoutComponentChunkName: string;
      matchPath: string;
      path: string;
    };
  };
  pathContext: {
    matchPath?: string;
  };
  staticContext?: object;
}

type GatsbyProps<GraphQL = undefined> = (GraphQL extends object
  ? { data: GraphQL }
  : {}) &
  GatsbyCommonProps;

export default GatsbyProps;
