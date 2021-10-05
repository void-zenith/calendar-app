import React, { useRef } from 'react'
import Home from './Container/Home'
import './Styles/styles.scss'
import store from './Redux/Store'
import { Provider } from 'react-redux'
import ReactToPrint from 'react-to-print'
const App = () => {
  const componentRef = useRef()
  return (
    <div>
      <Provider store={store}>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          documentTitle="Awesome calendar"
          content={() => componentRef.current}
        />
        <ClassBased ref={componentRef} />
      </Provider>
    </div>
  )
}

export default App

class ClassBased extends React.Component {
  render() {
    return <Home />
  }
}
