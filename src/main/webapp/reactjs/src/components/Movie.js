import React, {useState, useEffect} from 'react';
import axios from 'axios'

import "./Movie.css"


import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare, faSave, faUndo, faEdit} from "@fortawesome/free-solid-svg-icons";
import MovieToast from "./MovieToast";
import {Link} from "react-router-dom";

const Movie = (props) => {
    const initialState = {
        id: "",
        title: "",
        genre: "",
        imgCoverLink: "",
        dateRelease: "",
        description: "",
        director: "",
        runtime: 0,
        rating: 1
    }

    const [state, setState] = useState(initialState)
    const [toastShowState, setToastShowState] = useState(false)

    const movie = {
        title: state.title,
        genre: state.genre,
        imgCoverLink: state.imgCoverLink,
        dateRelease: state.dateRelease,
        description: state.description,
        director: state.director,
        runtime: state.runtime,
        rating: state.rating
    }

    useEffect(() => {
        const movieId = +props.match.params.id
        axios.get("http://localhost:8080/api/movies/" + movieId)
            .then(res => res.data)
            .then(data => {
                if (data != null) {
                    setState(data)
                }
            })
            .catch(() => {
                setState(initialState)
            })
    }, [props.match.params.id])

    const submitMovie = ev => {
        ev.preventDefault()
        axios.post("http://localhost:8080/api/movies", movie)
            .then(res => {
                if (res.data != null) {
                    setToastShowState(true);
                    setTimeout(() => setToastShowState(false), 3000)
                }
            })
        resetMovie()
    }

    const updateMovie = ev => {
        ev.preventDefault()

        const putMovie = {
            id: state.id,
            title: state.title,
            genre: state.genre,
            imgCoverLink: state.imgCoverLink,
            dateRelease: state.dateRelease,
            description: state.description,
            director: state.director,
            runtime: state.runtime,
            rating: state.rating
        }

        axios.put("http://localhost:8080/api/movies/" + putMovie.id, putMovie)
            .then(res => {
                if (res.data != null) {
                    setToastShowState(true);
                    setTimeout(() => setToastShowState(false), 3000)
                }
            })
        resetMovie()
    }

    const resetMovie = () => {
        setState(initialState)
    }

    const movieChangeAction = ev => {
        setState({...state, [ev.target.name]: ev.target.value})
    }

    return (
        <div>
            <MovieToast
                show={toastShowState}
                message= {"Movie Saved Successfully."}
                type={ "success"}
            />

            <Card className="bg-dark text-white border border-dark">
            <Form onReset={resetMovie} onSubmit={state.id !== "" ? updateMovie : submitMovie} id="movieFormId">
                <Card.Header>
                    <FontAwesomeIcon className="mr-2" icon={state.id !== "" ? faEdit : faPlusSquare}/>{state.id !== "" ? "Update Movie" : "Add New Movie"}
                </Card.Header>
                <Card.Body>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required
                                          name="title"
                                          value={state.title}
                                          onChange={movieChangeAction}
                                          type="text"
                                          placeholder="Enter movie title"
                                          className="bg-dark text-white"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control required
                                          name="genre"
                                          value={state.genre}
                                          onChange={movieChangeAction}
                                          type="text"
                                          placeholder="Enter movie genre"
                                          className="bg-dark text-white"
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Cover Image URL</Form.Label>
                            <Form.Control
                                name="imgCoverLink"
                                value={state.imgCoverLink}
                                onChange={movieChangeAction}
                                type="text"
                                placeholder="Enter url ending (.png, .jpg, ...)"
                                className="bg-dark text-white"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Date Release</Form.Label>
                            <Form.Control required
                                          name="dateRelease"
                                          value={state.dateRelease}
                                          onChange={movieChangeAction}
                                          type="date"
                                          className="bg-dark text-white"
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Movie description</Form.Label>
                            <Form.Control required
                                          name="description"
                                          value={state.description}
                                          onChange={movieChangeAction}
                                          as="textarea"
                                          rows={2}
                                          placeholder="Enter short movie description"
                                          className="bg-dark text-white"
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Director</Form.Label>
                            <Form.Control required
                                          name="director"
                                          value={state.director}
                                          onChange={movieChangeAction}
                                          type="text"
                                          placeholder="Enter movie director"
                                          className="bg-dark text-white"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Runtime (in mins)</Form.Label>
                            <Form.Control required
                                          name="runtime"
                                          value={state.runtime}
                                          onChange={movieChangeAction}
                                          type="number"
                                          placeholder="Enter movie runtime"
                                          className="bg-dark text-white"
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control required
                                          name="rating"
                                          value={state.rating}
                                          onChange={movieChangeAction}
                                          as="select"
                                          className="bg-dark text-white"
                                          placeholder="Enter movie rating"
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}/>
                    </Form.Row>

                </Card.Body>
                <Card.Footer style={{textAlign: "right"}}>
                    <Button size="sm" variant="outline-success" type="submit" className="mr-2">
                        <FontAwesomeIcon className="mr-2" icon={faSave}/>{state.id !== "" ? "Update" : "Save"}
                    </Button>
                    <Button size="sm" variant="outline-info" type="reset" className="mr-2">
                        <FontAwesomeIcon className="mr-2" icon={faUndo}/>Reset
                    </Button>
                    <Link to={"/list"}>
                        <Button size="sm" variant="outline-info" type="reset">
                            <FontAwesomeIcon className="mr-2" icon={faList}/>Movie List
                        </Button>
                    </Link>
                </Card.Footer>
            </Form>
        </Card>
</div>
);
};

export default Movie;