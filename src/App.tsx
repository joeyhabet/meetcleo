import React from 'react'
import { Provider } from 'react-redux'
import Merchants from './screens/Merchants'
import createStore from 'store'

const store = createStore()

const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <Merchants/>
  </Provider>
);

export default App;
