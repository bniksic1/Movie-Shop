import React from "react"
import './App.css'

import {Container, Row, Col} from "react-bootstrap"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import NavigationBar from "./components/NavigationBar"
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Movie from "./components/Movie";
import MovieList from "./components/MovieList";


function App() {
    const marginTop = {
        marginTop: "20px"
    }

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            <Route path="/list" component={MovieList}/>
                            <Route path="/add" component={Movie}/>
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
