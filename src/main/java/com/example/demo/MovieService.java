//package com.example.demo.service;
//
//import com.example.demo.domain.Movie;
//import com.example.demo.repository.MovieRepository;
//import org.codehaus.jettison.json.JSONException;
//import org.codehaus.jettison.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import java.util.Collection;
//import java.util.Optional;
//
//@Service
//public class MovieService implements IService<Movie>, IPageService<Movie> {
//    @Autowired
//    private MovieRepository movieRepository;
//
//    @Override
//    public Collection<Movie> findAll() {
//        return (Collection<Movie>) movieRepository.findAll();
//    }
//
//    @Override
//    public Page<Movie> findAll(Pageable pageable, String searchText) {
//        return movieRepository.findAllMovies(pageable, searchText);
//    }
//
//    @Override
//    public Page<Movie> findAll(Pageable pageable) {
//        return movieRepository.findAll(pageable);
//    }
//
//    @Override
//    public Optional<Movie> findById(Long id) {
//        return movieRepository.findById(id);
//    }
//
//    @Override
//    public Movie saveOrUpdate(Movie movie) {
//        return movieRepository.save(movie);
//    }
//
//    @Override
//    public String deleteById(Long id) {
//        JSONObject jsonObject = new JSONObject();
//        try {
//            movieRepository.deleteById(id);
//            jsonObject.put("message", "Book deleted successfully");
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }
//
//        return jsonObject.toString();
//    }
//}
