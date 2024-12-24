import AppRoot from './components/App/Root';
import bootstrap from './bootstrap';
import Registry from './lib/registry';

export const DecapCmsCore = {
  ...Registry,
  init: bootstrap,
  AppRoot,
};

export default DecapCmsCore;
