/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below contains definitions for gatsby-browser.ts
 *
 *            See https://www.gatsbyjs.org/docs/browser-apis
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Action, History, Location } from 'history';
import React from 'react';

export type onClientEntry = () => void;
export type onInitialClientRender = () => void;

interface OnRouteUpdate {
  action: Action;
  location: Location;
}
export type onRouteUpdate = (parameters: OnRouteUpdate) => void;

export type registerServiceWorker = () => boolean;

interface ReplaceComponentRenderer {
  props: object;
  loader: any;
}
export type replaceComponentRenderer = (
  parameters: ReplaceComponentRenderer
) => void;

export type replaceHistory = () => History;

export type replaceHydrateFunction = () => (
  element: JSX.Element,
  container: Element,
  callback: () => void
) => void;

interface ReplaceRouterComponent {
  history: History;
}
export type replaceRouterComponent = (
  parameters: ReplaceRouterComponent
) => React.ReactNode;

interface ShouldUpdateScroll {
  prevRouterProps: object;
  pathname: object;
}
export type shouldUpdateScroll = (parameters: ShouldUpdateScroll) => void;

interface WrapRootComponent {
  Root: any;
}
export type wrapRootComponent = (parameters: WrapRootComponent) => void;
