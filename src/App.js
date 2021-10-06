import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./Styles/styles.scss"
import store from "./Redux/Store"
import { Provider } from "react-redux"

import AddCalendar from "./Components/AddCalendar"
import Calendar from "./Components/Calendar"
import Home from "./Container/Home"
// import ReactToPrint from "react-to-print"

const App = () => {
  // const componentRef = useRef()
  return (
    <Provider store={store}>
      <Router>
        <div className='main-container'>
          <div className='navbar-container'></div>
          <div className='body-container'>
            <div className='left-container'></div>
            <div className='calendar-container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/create' component={AddCalendar} />
                <Route exact path='/calendar' component={Calendar} />
              </Switch>
            </div>
            <div className='right-container'></div>
          </div>
        </div>
      </Router>
    </Provider>

    // <div>
    //   <Provider store={store}>
    //     <ReactToPrint
    //       trigger={() => <button>Print this out!</button>}
    //       documentTitle="Awesome calendar"
    //       content={() => componentRef.current}
    //     />
    //     <ClassBased ref={componentRef} />
    //   </Provider>
    // </div>
  )
}

export default App

// class ClassBased extends React.Component {
//   render() {
//     return <Home />
//   }
// }
