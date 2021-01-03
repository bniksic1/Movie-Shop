import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Button, ButtonGroup, Card, FormControl, Image, InputGroup, Table} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faList,
    faEdit,
    faTrash,
    faFastBackward,
    faStepBackward,
    faStepForward,
    faFastForward
} from "@fortawesome/free-solid-svg-icons"
import MovieToast from "./MovieToast";
import {Link} from "react-router-dom";

const MovieList = () => {

    const [state, setState] = useState({
        movies: [],
        currentPage: 1,
        moviesPerPage: 5
    })
    const [showToastState, setShowToastState] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8080/api/movies")
            .then(res => res.data)
            .then(data => {
                setState({...state, movies: data})
            })
    }, [state.movies.length])

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

    const {movies, currentPage, moviesPerPage} = state

    const lastIndex = currentPage * moviesPerPage
    const firstIndex = lastIndex - moviesPerPage
    const totalPages = Math.ceil(movies.length / moviesPerPage)

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
            <MovieToast
                show={showToastState}
                message={ "Movie Deleted Successfully."}
                type={ "danger"}
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
                                movies.slice(firstIndex, lastIndex).map(movie => (
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
                                                <Link to={"edit/" + movie.id} className="btn btn-sm btn-outline-primary mr-2"><FontAwesomeIcon icon={faEdit} /></Link>
                                                <Button size="sm" variant="outline-danger" onClick={onClickDeleteMovie.bind(this, movie.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
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
    );
};

export default MovieList;