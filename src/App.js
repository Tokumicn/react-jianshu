import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {GlobalStyle} from './style.js';
import {GlobalIconfontStyle} from './statics/iconfont/iconfont';

import Header from './common/header';

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <GlobalIconfontStyle />
        <Provider store={store}>
          <Header />
        </Provider>
      </div>
    );
  }
}

export default App;
