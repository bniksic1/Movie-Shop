import React from 'react'
import {useHistory} from 'react-router-dom'
import {Navbar, Nav, FormControl, Button, Form, Image} from 'react-bootstrap'
import {Link} from "react-router-dom";

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
                Movie Shop
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
                <FormControl onKeyPress={(ev) => ev.charCode === 13 && handleSearch(ev)} id="input" type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info" onClick={handleSearch}>Search</Button>
            </Form>
        </Navbar>
    )
}

export default NavigationBar