import React from 'react'
import {Route} from 'react-router-dom'
import HomePage from './home/HomePage'
import AboutPage from './about/AboutPage'
import Header from './common/Header'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'
import PageNotFound from './common/PageNotFound'
import CoursesPage from './courses/CoursesPage'

function App() {
    return (
        <div className="container-fluid">
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/about" component={AboutPage}></Route>
                <Route path="/courses" component={CoursesPage}></Route>
                <Route component={PageNotFound}></Route>
            </Switch>
        </div>
    )
}

export default App