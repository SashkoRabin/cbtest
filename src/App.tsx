import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import AppView from './AppView';
import './styles/App.scss';


function App() {
  return (
    <Provider store={store}>
      <AppView />
    </Provider>
  );
}

export default App;
