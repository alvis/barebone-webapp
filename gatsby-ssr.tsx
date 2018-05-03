/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below specifies the configuration
 *            related to the server-side rendering.
 *
 *            See https://www.gatsbyjs.org/docs/ssr-apis
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { renderStaticOptimized } from 'glamor/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import createStore from '#redux';

import SSR from '#definitions/gatsby/ssr';

// export const onRenderBody: SSR.onRenderBody = (parameters): void => {};

// fix https://github.com/gatsbyjs/gatsby/issues/3231
export const replaceRenderer: SSR.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents
}): void => {
  const { store } = createStore();

  const { html, css, ids } = renderStaticOptimized(() =>
    renderToString(<Provider store={store}>{bodyComponent}</Provider>)
  );

  replaceBodyHTMLString(html);

  setHeadComponents([
    <style
      id="glamor-styles"
      key="glamor-styles"
      dangerouslySetInnerHTML={{ __html: css }}
    />,
    <script
      id="glamor-ids"
      key="glamor-ids"
      dangerouslySetInnerHTML={{
        __html: `
        // <![CDATA[
        window._glamor = ${JSON.stringify(ids)}
        // ]]>
        `
      }}
    />
  ]);
};
