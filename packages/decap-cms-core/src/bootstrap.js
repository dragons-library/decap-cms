import React from 'react';
import { createRoot } from 'react-dom/client';

import { store } from './redux';
import { loadConfig } from './actions/config';
import { authenticateUser } from './actions/auth';
import AppRoot from './components/App/Root';
import './components/EditorWidgets';
import './mediaLibrary';
import 'what-input';

const ROOT_ID = 'nc-root';

/**
 * Get DOM element where app will mount.
 */
function getRoot() {
  /**
   * Return existing root if found.
   */
  const existingRoot = document.getElementById(ROOT_ID);
  if (existingRoot) {
    return existingRoot;
  }

  /**
   * If no existing root, create and return a new root.
   */
  const newRoot = document.createElement('div');
  newRoot.id = ROOT_ID;
  document.body.appendChild(newRoot);
  return newRoot;
}

function bootstrap(opts = {}) {
  const { config, render = true } = opts;

  /**
   * Log the version number.
   */
  if (typeof DECAP_CMS_CORE_VERSION === 'string') {
    console.log(`decap-cms-core ${DECAP_CMS_CORE_VERSION}`);
  }

  /**
   * Dispatch config to store if received. This config will be merged into
   * config.yml if it exists, and any portion that produces a conflict will be
   * overwritten.
   */
  store.dispatch(
    loadConfig(config, function onLoad() {
      store.dispatch(authenticateUser());
    }),
  );

  /**
   * Exit early if render is not true
   */
  if (!render) {
    return;
  }

  /**
   * Render application root.
   */
  const root = createRoot(getRoot());
  root.render(<AppRoot />);
}

export default bootstrap;
