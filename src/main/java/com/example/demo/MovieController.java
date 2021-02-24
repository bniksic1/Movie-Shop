//package com.example.demo.resource;
//
//import com.example.demo.domain.Movie;
//import com.example.demo.service.IPageService;
//import com.example.demo.service.IService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping(path = "/api/movies")
//@CrossOrigin(origins="http://localhost:3000")
//public class MovieController implements Resource<Movie>{
//    @Autowired
//    private IService<Movie> movieService;
//
//    @Autowired
//    private IPageService<Movie> moviePageService;
//
//
//    @Override
//    public ResponseEntity<Page<Movie>> findAll(Pageable pageable, String searchText) {
//        return new ResponseEntity<>(moviePageService.findAll(pageable, searchText), HttpStatus.OK);
//    }
//
//    @Override
//    public ResponseEntity<Page<Movie>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
//        return new ResponseEntity<>(moviePageService.findAll(
//                PageRequest.of(
//                        pageNumber, pageSize,
//                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
//                )
//        ), HttpStatus.OK);
//    }
//
//    @Override
//    public ResponseEntity<Movie> findById(Long id) {
//        return new ResponseEntity<>(movieService.findById(id).get(), HttpStatus.OK);
//    }
//
//    @Override
//    public ResponseEntity<Movie> save(Movie movie) {
//        return new ResponseEntity<>(movieService.saveOrUpdate(movie), HttpStatus.CREATED);
//    }
//
//    @Override
//    public ResponseEntity<Movie> update(Movie movie) {
//        return new ResponseEntity<>(movieService.saveOrUpdate(movie), HttpStatus.OK);
//    }
//
//    @Override
//    public ResponseEntity<String> deleteById(Long id) {
//        return new ResponseEntity<>(movieService.deleteById(id), HttpStatus.OK);
//    }
//}
