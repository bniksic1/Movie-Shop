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


function App() {
    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row className="mb-lg-5">
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path="/edit/:id" component={Movie}/>
                            <Route path="/list" component={MovieList}/>
                            <Route path="/add" component={Movie}/>
                            <Route path="/users" component={UserList}/>
                            <Route path="/" component={Welcome}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    )
}

export default App
