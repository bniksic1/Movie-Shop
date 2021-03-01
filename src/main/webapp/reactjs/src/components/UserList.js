import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux';
import {fetchUsers} from "../services/user/userActions";

import {Alert, Button, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFastBackward, faFastForward, faStepBackward, faStepForward, faUsers} from "@fortawesome/free-solid-svg-icons";

import "./Style.css"

const UserList = (props) => {

    const [state, setState] = useState({
        currentPage: 1,
        usersPerPage: 5
    })



    useEffect(() => {
        // axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
        //     .then(res => res.data)
        //     .then(data => {
        //         setState({...state, users: data})
        //     })
        props.fetchUsers();
    }, [])

    const {currentPage, usersPerPage} = state

    const lastIndex = currentPage * usersPerPage
    const firstIndex = lastIndex - usersPerPage

    const userData = props.userData;
    const users = userData.users;

    const currentUsers = users.slice(firstIndex, lastIndex)
    const totalPages = users.length / usersPerPage

    const firstPage = () => {
        setState({...state, currentPage: 1})
    }

    const prevPage = () => {
        setState({...state, currentPage: currentPage - 1})
    }

    const changePage = ev => {
        setState({...state, currentPage: ev.target.value})
    }

    const nextPage = () => {
        setState({...state, currentPage: currentPage + 1})
    }

    const lastPage = () => {
        setState({...state, currentPage: totalPages})
    }

    return (
        <div>
            {userData.error ?
                    <Alert variant="danger">
                        {userData.error}
                    </Alert>
                    :
                    <Card className="bg-dark text-white border border-dark">
                        <Card.Header>
                            <FontAwesomeIcon className="mr-2" icon={faUsers}/>User List
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Created</th>
                                    <th>Balance</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.length === 0 ?
                                    <tr align="center">
                                        <td colSpan={5}> No Users Available</td>
                                    </tr> :
                                    currentUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.first}{' '}{user.last}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.created}</td>
                                            <td>{user.balance}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{float: "left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{float: "right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 } onClick={firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 } onClick={prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"bg-dark page-num"} value={currentPage} onChange={changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages } onClick={nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages } onClick={lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer>
                    </Card>
            }
        </div>
    )
}

const mapStateToProps = state => (
    {
        userData: state.user
    }
);

const mapDispatchToProps = dispatch => (
    {
        fetchUsers: () => dispatch(fetchUsers())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);