import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Button, ButtonGroup, Card, Image, Table} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faList, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"

const MovieList = () => {

    const [state, setState] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/movies")
            .then(res => res.data)
            .then(data => {
                setState(data)
            })
    })

    return (
        <Card className="bg-dark text-white border border-dark">
            <Card.Header>
                <FontAwesomeIcon className="mr-2" icon={faList}/>Movie List
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Rating</th>
                        <th>Director</th>
                        <th>Date Release</th>
                        <th>Runtime</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state.length === 0 ?
                            <td colSpan={7}>No movies available.</td>
                            :
                            state.map(movie => (
                                <tr>
                                    <td>
                                        <Image
                                            src={movie.imgCoverLink}
                                            roundedCircle
                                            width={25}
                                            height={25}
                                            className="mr-2"
                                        />
                                        {movie.title}
                                    </td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.rating}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.dateRelease}</td>
                                    <td>{movie.runtime}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button size="sm" variant="outline-primary" className="mr-2"><FontAwesomeIcon icon={faEdit} /></Button>
                                            <Button size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))
                    }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default MovieList;