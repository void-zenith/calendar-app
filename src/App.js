import React from 'react'
import Home from './Container/Home'
import './Styles/styles.scss'
import store from './Redux/Store'
import { Provider } from 'react-redux'
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Home></Home>
      </Provider>
    </div>
  )
}

export default App
