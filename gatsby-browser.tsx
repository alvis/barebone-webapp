/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The following script defines actions to
 *            be loaded in the clients' browser.
 *
 *            See https://www.gatsbyjs.org/docs/browser-apis
 *            for detailed usage.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import 'babel-polyfill';

import Browser from '#definitions/gatsby/browser';

/*
 * onClientEntry is required for the polyfill to be loaded
 * see https://github.com/gatsbyjs/gatsby/issues/2177
 */
export const onClientEntry: Browser.onClientEntry = (): void => {
  // no need to do anything here, but if you don't
  // export something, the import won't work.
};

// export const onInitialClientRender: Browser.onInitialClientRender = (): void => {};

// export const onRouteUpdate: Browser.onRouteUpdate = (parameters): void => {};

// export const registerServiceWorker: Browser.registerServiceWorker = (): boolean => {};

// export const replaceComponentRenderer: Browser.replaceComponentRenderer = (parameters): void => {};

// export const replaceHydrateFunctionL: Browser.replaceHydrateFunction = (): ((
//   element: JSX.Element,
//   container: Element,
//   callback: () => void
// ) => void) => {};

// export const replaceHistory: Browser.replaceHistory = (): History => {};

// export const replaceRouterComponent: Browser.replaceRouterComponent = (parameters): React.ReactNode => {};

// export const shouldUpdateScroll: Browser.shouldUpdateScroll = (parameters): void => {};

// export const wrapRootComponent: Browser.wrapRootComponent = (parameters): void => {};
