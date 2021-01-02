import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Button, ButtonGroup, Card, Image, Table} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faList, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import MovieToast from "./MovieToast";

const MovieList = () => {

    const [state, setState] = useState([])
    const [showToastState, setShowToastState] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8080/api/movies")
            .then(res => res.data)
            .then(data => {
                setState(data)
            })
    })

    const onClickDeleteMovie = (movieId) => {
        axios.delete("http://localhost:8080/api/movies/" + movieId)
            .then(res => res.data)
            .then(data => {
                if(data != null) {
                    setShowToastState(true);
                    setTimeout(() => setShowToastState(false), 3000)
                }
            })

    }

    return (
        <div>
            <MovieToast
                children={{show: showToastState, message: "Movie Deleted Successfully.", type: "danger"}}
            />
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
                                <tr><td colSpan={7}>No movies available.</td></tr>
                                :
                                state.map(movie => (
                                    <tr key={movie.id}>
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
                                                <Button size="sm" variant="outline-danger" onClick={onClickDeleteMovie.bind(this, movie.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MovieList;