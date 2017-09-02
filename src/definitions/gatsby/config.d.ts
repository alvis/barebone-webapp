/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below contains definitions for gatsby-config.ts
 *
 *            See https://www.gatsbyjs.org/docs/gatsby-config
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

export interface Plugin {
  resolve: string;
  options?: object;
}

export type Plugins = Array<string | Plugin>;
