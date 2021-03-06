package com.example.demo.repository;

import com.example.demo.domain.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

//    @Query("FROM Movie WHERE title LIKE CONCAT('%', :query, '%') ")
//    List<Movie> findAllByTitleContainingIgnoreCase(String search);

    Page<Movie> findAllByTitleContainingIgnoreCase(String search, Pageable pageable);

//    @Query("FROM Movie WHERE title LIKE CONCAT('%', :search, '%') ORDER BY :sortBy ASC LIMIT ")
//    List<Movie> findALlWithSearchAndPaginationAndSortAsc(@Param("search") String search, @Param("pageNumber") Integer pageNumber,
//                                                      @Param("pageSize") Integer pageSize, @Param("sortBy") String sortBy);
}
