import React from 'react';
import { Provider, connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { GlobalStyles } from 'decap-cms-ui-default';
import { I18n } from 'react-polyglot';

import { store } from '../../redux';
import { history } from '../../routing/history';
import { getPhrases } from '../../lib/phrases';
import { selectLocale } from '../../reducers/config';
import { ErrorBoundary } from '../UI';
import App from './App';

function TranslatedApp({ locale, config }) {
  return (
    <I18n locale={locale} messages={getPhrases(locale)}>
      <ErrorBoundary showBackup config={config}>
        <Router history={history}>
          <Route component={App} />
        </Router>
      </ErrorBoundary>
    </I18n>
  );
}

function mapDispatchToProps(state) {
  return { locale: selectLocale(state.config), config: state.config };
}

const ConnectedTranslatedApp = connect(mapDispatchToProps)(TranslatedApp);

export default function Root() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <ConnectedTranslatedApp />
      </Provider>
    </>
  );
}
