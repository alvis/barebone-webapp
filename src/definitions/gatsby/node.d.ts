/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below contains definitions for gatsby-node.ts
 *
 *            See https://www.gatsbyjs.org/docs/node-apis
 *            for defailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

// see https://www.gatsbyjs.org/docs/node-apis
export type GraphQL = <R = object>(
  query: string
) => Promise<{ data: R; errors: any[] }>;

interface Job {
  id: string;
}

export interface PageInput {
  // see https://www.gatsbyjs.org/docs/bound-action-creators/#createPage
  path: string; // a route pattern (must start with a forward slash) e.g. /app/:path
  matchPath?: string; // a special key that's used for matching pages only on the client
  component: string; // the absolute path to the component for this page e.g. path.resolve('./src/components/app')
  layout?: string; // the name of the layout for the page (by default `index` is used)
  context?: object; // the context data which will be passed to the component as props.pathContext (also as the context argument for the graphql query)
}

interface LayoutInput {
  id?: string;
  machineId?: string;
  component: string;
  layout?: string;
  context?: object;
}

interface Page {
  path: string; // uri
  matchPath?: string; // a special key that's used for matching pages only on the client
  component: string; // path to the component
  context: object;
  internalComponentName: string;
  jsonName: string;
  componentChunkName: string;
  layout?: string;
  updatedAt: number;
}

interface Layout {
  id: any;
  context: Object;
  component: string;
  componentWrapperPath: string;
  componentChunkName: string;
  internalComponentName: string;
  jsonName: string;
  isLayout: true;
}

interface Plugin {
  name: string;
}

interface CreateNodeField {
  node: object;
  fieldName?: string;
  fieldValue?: string;
  name?: string;
  value: any;
}

interface CreateParentChildLink {
  parent: any;
  child: any;
}

interface CreatePageDependency {
  path: string;
  nodeId: string;
  connection: string;
}

interface CreateRedirect {
  fromPath: string;
  isPermanent: boolean;
  redirectInBrowser: boolean;
  toPath: string;
  [key: string]: any;
}

interface ReplaceComponentQuery {
  query: string;
  componentPath: string;
}

interface CreatorActions {
  // see https://www.gatsbyjs.org/docs/bound-action-creators
  // also https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/redux/actions.js
  createJob(job: Job, plugin?: Plugin): void;
  createLayout(layout: LayoutInput, plugin?: Plugin, traceId?: string): void;
  createNode(node: any, plugin?: Plugin, traceId?: string): void;
  createNodeField(
    parameters: CreateNodeField,
    plugin: Plugin,
    traceId?: string
  ): void;
  createPage(page: PageInput, plugin?: Plugin, traceId?: string): void;
  createParentChildLink(
    parameters: CreateParentChildLink,
    plugin?: Plugin
  ): void;
  createPageDependency(parameters: CreatePageDependency, plugin: string): void;
  createRedirect(parameters: CreateRedirect): void;
  deleteLayout(layout: Layout, plugin?: Plugin): void;
  deleteComponentsDependencies(paths: string[]): void;
  deleteNode(nodeID: string, node: any, plugin?: Plugin): void;
  deleteNodes(nodeIDs: string[], plugin?: Plugin): void;
  deletePage(page: PageInput): void;
  endJob(job: Job, plugin?: Plugin): void;
  setJob(job: Job, plugin?: Plugin): void;
  setPluginStatus(status: object, plugin: Plugin): void;
  replaceComponentQuery(parameters: ReplaceComponentQuery): void;
  touchNode(nodeID: string, plugin?: Plugin): void;
}

interface CreateLayoutsAndPages {
  boundActionCreators: CreatorActions;
  graphql: GraphQL;
}

export type createLayouts = (
  parameters: CreateLayoutsAndPages
) => Promise<void>;

export type createPages = (parameters: CreateLayoutsAndPages) => Promise<void>;

export type createPagesStatefully = (
  parameters: CreateLayoutsAndPages
) => Promise<void>;

export type generateSideEffects = Function; // depreciate soon
export type modifyBabelrc = Function; // depreciate soon

interface ModifyWebpackConfigParameters {
  config: any; // webpack-configuration
  stage:
    | 'develop'
    | 'develop-html'
    | 'build-css'
    | 'build-html'
    | 'build-javascript';
}
export type modifyWebpackConfig = (
  parameters: ModifyWebpackConfigParameters
) => any;

interface OnCreateLayout {
  // page: {
  //   layout: string;
  //   jsonName: string;
  //   internalComponentName: string;
  //   path: string; // uri
  //   matchPath?: string; // a special key that's used for matching pages only on the client
  //   component: string; // path to the comonent
  //   componentChunkName: string;
  //   context: object;
  //   updatedAt: number;
  //   pluginCreator___NODE: string;
  //   pluginCreatorId: string;
  //   componentPath: string;
  // };
  // boundActionCreators: CreatorActions;
}

export type onCreateLayout = (
  parameters: OnCreateLayout,
  options?: object
) => void;

interface OnCreateNode {
  // page: {
  //   layout: string;
  //   jsonName: string;
  //   internalComponentName: string;
  //   path: string; // uri
  //   matchPath?: string; // a special key that's used for matching pages only on the client
  //   component: string; // path to the comonent
  //   componentChunkName: string;
  //   context: object;
  //   updatedAt: number;
  //   pluginCreator___NODE: string;
  //   pluginCreatorId: string;
  //   componentPath: string;
  // };
  node: any;
  boundActionCreators: CreatorActions;
}

export type onCreateNode = (parameters: OnCreateNode, options?: object) => void;

interface OnCreatePage {
  page: Page;
  boundActionCreators: CreatorActions;
}

export type onCreatePage = (parameters: OnCreatePage, options?: object) => void;

export type onPostBootstrap = Function; // todo
export type onPostBuild = Function; // todo
export type onPreBootstrap = Function; // todo
export type onPreBuild = Function; // todo
export type onPreExtractQueries = Function; // todo
export type preprocessSource = any; // todo
export type resolvableExtensions = any; // todo
export type setFieldsOnGraphQLNodeType = any; // todo
export type sourceNodes = Function; // todo
