import React from "react"
import './App.css'

import {Container, Row, Col} from "react-bootstrap"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import NavigationBar from "./components/NavigationBar"
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Movie from "./components/Movie";
import MovieList from "./components/MovieList";
import UserList from "./components/UserList";
import Register from "./components/Register";
import Login from "./components/Login";


function App() {
    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row className="mb-lg-5">
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route exact path="/" component={Welcome}/>
                            <Route exact path="/users" component={UserList}/>
                            <Route exact path="/add" component={Movie}/>
                            <Route exact path="/list" component={MovieList}/>
                            <Route exact path="/edit/:id" component={Movie}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/logout" component={Welcome}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    )
}

export default App
