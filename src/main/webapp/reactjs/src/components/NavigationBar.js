import React from 'react'
import {useHistory} from 'react-router-dom'
import {Navbar, Nav, FormControl, Button, Form, Image} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
    const history = useHistory()

    const handleSearch = (ev) => {
        ev.preventDefault()
        const searchQuery = document.getElementById("input").value
        history.push("/list?search=" + searchQuery)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Link to={""} className="navbar-brand">
                <Image
                    src="https://www.iconarchive.com/download/i61405/hadezign/hobbies/Movies.ico"
                    width="20"
                    className="mr-1"
                />
                Movie Store
            </Link>
            <Nav className="mr-auto">
                <Link to={"/add"} className="nav-link">
                    Add Movie
                </Link>
                <Link to={"/list"} className="nav-link">
                    Movie List
                </Link>
                <Link to={"/users"} className="nav-link">
                    User List
                </Link>
            </Nav>
            <Form inline>
                <Button variant="outline-info" onClick={handleSearch}>Search</Button>
                <FormControl onKeyPress={(ev) => ev.charCode === 13 && handleSearch(ev)} id="input" type="text" placeholder="Search" className="ml-2" />
            </Form>
            <Nav className="navbar-right">
                <Link to={"register"} className="nav-link ml-3"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar