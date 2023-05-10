import * as React from 'react';
import './style.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './Layout';
import { FirstPage } from './FitstPage';
import { Content } from './Content';

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path={'/'}>
            <FirstPage />
          </Route>
          <Route path={'/:id'}>
            <Layout>
              <Content />
            </Layout>
          </Route>
        </Switch>
      </HashRouter>
    </Provider>
  );
}
