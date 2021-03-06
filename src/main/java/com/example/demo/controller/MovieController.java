package com.example.demo.controller;

import com.example.demo.domain.Movie;
import com.example.demo.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/movies")
@CrossOrigin(origins = "*")
public class MovieController{
    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> findAll() {
        return new ResponseEntity<>(movieService.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Movie> findById(@PathVariable Long id) {
        return new ResponseEntity<>(movieService.findById(id).get(), HttpStatus.OK);
    }

//    @GetMapping("/search/{search}")
//    public List<Movie> findById(@PathVariable String search) {
//        return movieService.findAllByTitleContainsIgnoreCase(search);
//    }

//    @GetMapping(params = {"search", "pageSize", "pageNumber", "sortBy", "sortDir"})
//    public ResponseEntity<Page<Movie>> findAll(@RequestParam String search, @RequestParam Integer pageSize, @RequestParam Integer pageNumber,
//                                               @RequestParam String sortBy, @RequestParam String sortDir) {
//
//        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize,
//                sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
//
////        movieService.findAllByTitleContainsIgnoreCase(search).subList();
////
////        var result = movieService.findAll(pageable).getContent()
////                .stream()
////                .filter(m -> search.equals("") || m.getTitle().toUpperCase().contains(search.toUpperCase()))
////                .collect(Collectors.toCollection(ArrayList::new));
//
//        return new ResponseEntity<>(movieService.findAllByTitleContainsIgnoreCase(search, pageable), HttpStatus.OK);
//    }
//
//    @GetMapping(params = { "pageSize", "pageNumber" })
//    public ResponseEntity<Page<Movie>> findAll(@RequestParam Integer pageSize, @RequestParam Integer pageNumber) {
//        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
//        return new ResponseEntity<>(movieService.findAll(pageable), HttpStatus.OK);
//    }
    @GetMapping("/options")
    public ResponseEntity<Page<Movie>> findAll(String search, Pageable pageable) {
        Pageable p = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        return new ResponseEntity<>(
                movieService.findAllByTitleContainsIgnoreCase(search, p),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<Movie> save(@RequestBody Movie movie) {
        return new ResponseEntity<>(movieService.saveOrUpdate(movie), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Movie> update(@RequestBody Movie movie) {
        return new ResponseEntity<>(movieService.saveOrUpdate(movie), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable Long id) {
        movieService.deleteById(id);
    }

}
