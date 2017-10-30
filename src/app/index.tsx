/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below lay out the foundation for a React App.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetchPonyfill from 'fetch-ponyfill';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';

const { fetch } = fetchPonyfill();

const GATEWAY = process.env.GATEWAY;

if (typeof GATEWAY === 'undefined') {
  throw new Error('The gateway has not been specified');
}

const client = new ApolloClient<any>({
  link: new HttpLink({
    fetch,
    uri: GATEWAY
  }),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  public componentDidMount(): void {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <p>App Area</p>
      </ApolloProvider>,
      document.getElementById('root')
    );
  }

  public render(): JSX.Element {
    return <div id="root" />;
  }
}
