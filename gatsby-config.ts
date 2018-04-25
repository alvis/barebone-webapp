/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below specifies the configuration for Gatsby.
 *
 *            See https://www.gatsbyjs.org/docs/gatsby-config
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import Config from '#definitions/gatsby/config';

export const plugins: Config.Plugins = [
  `gatsby-plugin-catch-links`, // catch links in markdown files
  {
    resolve: `gatsby-plugin-nprogress`, // show the nprogress indicator when a page is delayed in loading
    options: {
      color: `tomato`
    }
  },
  `gatsby-plugin-offline`, // enable offline browsing
  {
    resolve: `gatsby-plugin-sass`, // enable postcss + sass
    options: {
      postCssPlugins: []
    }
  },
  `gatsby-plugin-purify-css`, // remove unused CSS in production
  `gatsby-plugin-react-helmet`, // ensure the custom style sheet is inserted properly
  `gatsby-plugin-sitemap`, // generate a sitemap automatically
  `gatsby-plugin-typescript` // enable typescript
];

export const siteMetadata = {
  title: `Hello World`,
  siteUrl: `https://hello.world`
};
