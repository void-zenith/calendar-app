import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./Styles/styles.scss"
import store from "./Redux/Store"
import { Provider, useSelector } from "react-redux"

import AddCalendar from "./Components/AddCalendar"
import Calendar from "./Components/Calendar"
import Home from "./Container/Home"
import { eventError, eventsLoading } from "./Features/Calendar/EventSlice"
// import ReactToPrint from "react-to-print"

const App = () => {
  // const componentRef = useRef()

  return (
    <Provider store={store}>
      <Router>
        <div className='main-container'>
          <div className='navbar-container'></div>
          <div className='body-container'>
            <div className='left-container'>
              <Nav />
            </div>
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

const Nav = () => {
  const evLoading = useSelector(eventsLoading)
  const evError = useSelector(eventError)
  return (
    <>
      {evLoading && <h4>Loading events...</h4>}
      {evError && <h4>Something went wrong ...</h4>}
    </>
  )
}
