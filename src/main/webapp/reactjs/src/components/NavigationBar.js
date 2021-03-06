import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Navbar, Nav, FormControl, Button, Form, Image} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faSignInAlt,
    faSignOutAlt,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../services/user/auth/authActions";

const NavigationBar = (props) => {
    const history = useHistory()

    const handleSearch = (ev) => {
        ev.preventDefault();
        const searchQuery = document.getElementById("input").value;
        history.push("/list?search=" + searchQuery);
    }

    const guestLinks = (
        <Nav className="ml-auto">
            <Link to={"register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
            <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
        </Nav>
    );

    const userLinks = (
        <>
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
                <Button variant="outline-info" onClick={handleSearch}><FontAwesomeIcon icon={faSearch}/></Button>
                <FormControl onKeyPress={(ev) => ev.charCode === 13 && handleSearch(ev)} id="input" type="text" placeholder="Title Searching" className="ml-1 bg-dark border-info text-info"/>
            </Form>
            <Nav>
                <Link to={"/logout"} className="nav-link ml-2" onClick={props.logoutUser}>
                    Logout{' '}
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                </Link>
            </Nav>
        </>
    );

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
            {props.login.isLoggedIn ? userLinks : guestLinks}
        </Navbar>
    )
}

const mapStateToProps = state => ({
    login: state.auth
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)