import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from 'reducers'
import App from 'containers/app'
import { BrowserRouter } from 'react-router-dom'
import 'styles/index.css'

console.log(rootReducer)

const store = createStore(rootReducer)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))