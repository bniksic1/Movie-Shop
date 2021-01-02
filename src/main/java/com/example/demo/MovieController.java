package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/movies")
@CrossOrigin("*")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> getAllMovies(){
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable("id") Integer id){
        return movieService.getMovie(id);
    }

    @PostMapping
    public void addMovie(@RequestBody Movie m){
        movieService.addMovie(m);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable("id") Integer id){
        movieService.deleteMovie(id);
    }

    @PutMapping("/{id}")
    public void updateMovie(@PathVariable("id") Integer id, @RequestBody Movie m){
        movieService.updateMovie(id, m);
    }
}
