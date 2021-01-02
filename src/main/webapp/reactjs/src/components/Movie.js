import React, {useState} from 'react';
import axios from 'axios'

import "./Movie.css"


import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import MovieToast from "./MovieToast";

const Movie = () => {
    const initialState = {
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
        runtime: state.runtime + " min",
        rating: state.rating
    }

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

    const resetMovie = () => {
        setState(initialState)
    }

    const movieChangeAction = ev => {
        setState({...state, [ev.target.name]: ev.target.value})
    }

    return (
        <div>
            <MovieToast
                children={{show: toastShowState, message: "Movie Added Successfully."}}
            />

            <Card className="bg-dark text-white border border-dark">
            <Form onReset={resetMovie} onSubmit={submitMovie} id="movieFormId">
                <Card.Header>
                    <FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Add movie
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
                        <FontAwesomeIcon className="mr-2" icon={faSave}/>Submit
                    </Button>
                    <Button size="sm" variant="outline-info" type="reset">
                        <FontAwesomeIcon className="mr-2" icon={faUndo}/>Reset
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
</div>
);
};

export default Movie;