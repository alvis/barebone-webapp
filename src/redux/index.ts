/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The code below provides the redux logic for the project.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

/* ----- Action ----- */

import * as actions from './actions';
export { actions };

import { LocationChangeAction, RouterAction } from 'react-router-redux';
import { ActionsUnion } from 'typesafe-actions';

type AppAction = NonNullable<
  | ActionsUnion<typeof actions>
>;
type ReactRouterAction = RouterAction | LocationChangeAction;

export type Action = AppAction | ReactRouterAction;

// ---------------------------------------- //

/* ----- State ----- */

import { RouterState as GenericRouterState } from 'react-router-redux';
interface RouterHistoryState {
  history: Array<NonNullable<GenericRouterState['location']>>;
}
type RouterState = GenericRouterState & RouterHistoryState;

export interface State {
  router: RouterState;
}

// ---------------------------------------- //

/* ----- Reducer ----- */

import { routerReducer } from 'react-router-redux';
import reduceReducer from 'reduce-reducers';
import { combineReducers } from 'redux';

import { LOCATION_CHANGE } from 'react-router-redux';
import { Reducer } from 'redux';

// this helper add a stack of path history to the router state
const historyStackSize =
  process.env.HISTORY_STACK_SIZE &&
  Number.isInteger(Number(process.env.HISTORY_STACK_SIZE))
    ? Number(process.env.HISTORY_STACK_SIZE)
    : 10;
const historyReducer: Reducer<RouterState> = (
  state: RouterState,
  action: Action
): RouterState => {
  switch (action.type) {
    case LOCATION_CHANGE:
      const history =
        state && state.history
          ? // don't store allprevious paths
            [...state.history, action.payload].splice(
              Math.max(0, state.history.length - historyStackSize + 1)
            )
          : [action.payload];

      return { ...state, history };
    default:
      return state;
  }
};

export const rootReducer = combineReducers<State, Action>({
  router: reduceReducer<RouterState>(
    routerReducer as Reducer<RouterState>,
    historyReducer
  )
});

// ---------------------------------------- //

/* ----- Store Initialiser ----- */

import {
  compose,
  createStore,
  Store,
  StoreEnhancer,
  StoreEnhancerStoreCreator
} from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { Persistor } from 'redux-persist';

interface PreparedStore {
  store: Store<State>;
  persistor: Persistor;
}

export default function prepareStore(
  ...enhancers: StoreEnhancer[]
): PreparedStore {
  // combine other middlewares
  const combinedEnhancer = compose<StoreEnhancerStoreCreator>(
    ...enhancers
  );

  // make the redux store persistent
  const persistConfig = {
    key: 'root',
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore<State, Action, {}, {}>(
    persistedReducer,
    combinedEnhancer
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

// ---------------------------------------- //
