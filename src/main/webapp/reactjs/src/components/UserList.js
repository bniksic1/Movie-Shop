import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFastBackward, faFastForward, faStepBackward, faStepForward, faUsers} from "@fortawesome/free-solid-svg-icons";

const UserList = () => {

    const [state, setState] = useState({
        users: [],
        currentPage: 1,
        usersPerPage: 5
    })

    useEffect(() => {
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then(res => res.data)
            .then(data => {
                setState({...state, users: data})
            })
    }, [])

    const {users, currentPage, usersPerPage} = state

    const lastIndex = currentPage * usersPerPage
    const firstIndex = lastIndex - usersPerPage
    const currentUsers = users.slice(firstIndex, lastIndex)
    const totalPages = users.length / usersPerPage

    const pageNumCss = {
        width: "45px",
        border: "1px solid #17A2B8",
        color: "#17A2B8",
        textAlign: "center",
        fontWeight: "bold"
    }

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
                            <FormControl style={pageNumCss} className={"bg-dark"} value={currentPage} onChange={changePage}/>
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
        </div>
    )
}

export default UserList