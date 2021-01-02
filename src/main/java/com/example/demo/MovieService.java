package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieFakeModel movieFakeModel;

    @Autowired
    public MovieService(MovieFakeModel movieFakeModel) {
        this.movieFakeModel = movieFakeModel;
    }

    public List<Movie> getAllMovies(){
        return movieFakeModel.getMovies();
    }

    public Movie getMovie(Integer id){
        return movieFakeModel.getMovie(id);
    }

    public boolean addMovie(Movie m){
        return movieFakeModel.addMovie(m);
    }

    public boolean deleteMovie(Integer id){
        return movieFakeModel.removeMovie(id);
    }

    public void updateMovie(Integer id, Movie m){
        movieFakeModel.updateMovie(id, m);
    }
}
