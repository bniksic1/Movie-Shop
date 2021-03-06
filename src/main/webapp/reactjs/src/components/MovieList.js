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
import "./Style.css"
import {Link} from "react-router-dom";

const MovieList = () => {
    const [state, setState] = useState({
        movies: [],
        currentPage: 1,
        moviesPerPage: 5,
        totalPages: 1,
        sort: {
            sortedBy: "title",
            sortedAsc: true
        }
    })

    const initialSortArrow = {
        title: true,
        genre: false,
        rating: false,
        director: false,
        dateRelease: false,
        runtime: false
    }
    const [sortArrow, setSortArrow] = useState(initialSortArrow)

    const {movies, currentPage, moviesPerPage, sort, totalPages} = state
    const [showToastState, setShowToastState] = useState(false)

    const getPages = () => {
        let searchQuery = new URLSearchParams(window.location.search).get('search')
        if(searchQuery == null)
            searchQuery = ""

        let sortDir = sort.sortedAsc ? "asc" : "desc"

        axios.get("http://localhost:8080/api/movies/options?" +
                "search=" +  searchQuery + "&" +
                "page=" + currentPage + "&" +
                "size=" + moviesPerPage + "&" +
                "sort=" + sort.sortedBy + "," + sortDir)
            .then(res => res.data)
            .then(data => {
                setState({...state,
                    movies: data.content,
                    totalPages: data.totalPages
                })
            })
    }

    const setSortData = async (sortBy) => {
        initialSortArrow["title"] = false
        initialSortArrow[sortBy] = true
        setSortArrow(initialSortArrow)
    }

    const sortData = (sortedBy) => {
        setSortData(sortedBy).then(() => {
            setState({
                ...state,
                sort:{
                    sortedBy: sortedBy,
                    sortedAsc: !sort.sortedAsc
                }
            })
        })
    }

    useEffect(() => {
        getPages()
    }, [currentPage, sort, window.location.search])

    const onClickDeleteMovie = (movieId) => {
        axios.delete("http://localhost:8080/api/movies/" + movieId)
            .then(res => res.data)
            .then(data => {
                if(data != null) {
                    setShowToastState(true);
                    setTimeout(() => setShowToastState(false), 3000)
                    getPages()
                }
            })

    }

    const firstPage = () => {
        setState({...state, currentPage: 1})
    }

    const prevPage = () => {
        setState({...state, currentPage: currentPage - 1})
    }

    const changePage = ev => {
        if(ev.target.value.match(/\D/g) != null) {
            ev.target.value.replace(/\D/g, "")
            return
        }
        setState({...state, currentPage: ev.target.value})
    }

    const nextPage = () => {
        setState({...state, currentPage: state.currentPage + 1})
    }

    const lastPage = () => {
        setState({...state, currentPage: totalPages})
    }

    const sortArrowDirection = sort.sortedAsc ? "arrow-down" : "arrow-up"

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
                            <th onClick={() => sortData("title")}>Title<div className={`arrow ${sortArrow.title ? "enable-arrow" : "disable-arrow"} ${sortArrowDirection}`}/></th>
                            <th onClick={() => sortData("genre")}>Genre<div className={`arrow ${sortArrow.genre ? "enable-arrow" : "disable-arrow"} ${sortArrowDirection}`}/></th>
                            <th onClick={() => sortData("rating")}>Rating<div className={`arrow ${sortArrow.rating ? "enable-arrow" : "disable-arrow"} ${sortArrowDirection}`}/></th>
                            <th onClick={() => sortData("director")}>Director<div className={`arrow ${sortArrow.director ? "enable-arrow" : "disable-arrow"} ${sortArrowDirection}`}/></th>
                            <th onClick={() => sortData("dateRelease")}>Date Release<div className={`arrow ${sortArrow.dateRelease ? "enable-arrow" : "disable-arrow"} ${sortArrowDirection}`}/></th>
                            <th onClick={() => sortData("runtime")}>Runtime<div className={`arrow ${sortArrow.runtime ? "enable-arrow" : "disable-arrow"} ${sortArrowDirection}`}/></th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.length === 0 ?
                                <tr><td colSpan={7}>No movies available.</td></tr>
                                :
                                movies.map(movie => (
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
                                <Button type="button" variant="outline-info" disabled={currentPage === 1} onClick={firstPage}>
                                    <FontAwesomeIcon icon={faFastBackward} /> First
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1} onClick={prevPage}>
                                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                                </Button>
                            </InputGroup.Prepend>
                            <FormControl className={"bg-dark page-num"} value={currentPage} onChange={changePage}/>
                            <InputGroup.Append>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages} onClick={nextPage}>
                                    <FontAwesomeIcon icon={faStepForward} /> Next
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages} onClick={lastPage}>
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