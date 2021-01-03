package com.example.demo;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MovieFakeModel {
    private List<Movie> MOVIES = new ArrayList<>(){
        {
            add(new Movie(1,
                "Titanic",
                "Romance",
                8,
                "James Cameron",
                194,
                "1997-11-01",
                "The Titanic was a luxury British steamship that sank in the early hours of April 15, 1912 after striking an iceberg, leading to the deaths of more than 1,500 passengers and crew.",
                "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX182_CR0,0,182,268_AL_.jpg"));
            add(new Movie(2,
                    "Pulp Fiction",
                    "Crime",
                    9,
                    "Quentin Tarantino",
                    154,
                    "1994-10-14",
                    "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                    "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR1,0,182,268_AL_.jpg"));
            add(new Movie(3,
                    "Fight Club",
                    "Drama",
                    8,
                    "David Fincher",
                    139,
                    "1995-10-15",
                    "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
                    "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"));
            add(new Movie(4,
                    "The Shawshank Redemption",
                    "Drama",
                    9,
                    "Frank Darabont",
                    142,
                    "1994-10-14",
                    "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                    "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"));
            add(new Movie(5,
                    "The Godfather",
                    "Crime",
                    9,
                    "Francis Ford Coppola",
                    175,
                    "1972-03-24",
                    "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                    "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg"));
        }
    };

    public List<Movie> getMovies() {
        return MOVIES;
    }

    public Movie getMovie(Integer id){
        return MOVIES.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst()
                .orElseThrow();
    }

    public boolean addMovie(Movie m){
        m.setId(MOVIES.size() + 1);
        return MOVIES.add(m);
    }

    public boolean removeMovie(Integer id){
        return MOVIES.removeIf(m -> m.getId().equals(id));
    }

    public void updateMovie(Integer id, Movie newMovie){
        MOVIES = MOVIES
                .stream()
                .map(movie -> {
                    if(movie.getId().equals(id)) {
                        movie = newMovie;
                        movie.setId(id);
                    }
                    return movie;
                })
                .collect(Collectors.toList());
    }
}
