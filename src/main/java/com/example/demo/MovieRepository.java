package com.example.demo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

//    @Query("FROM Movie WHERE title LIKE CONCAT('%', :query, '%') ")
//    List<Movie> findAllByTitleContainingIgnoreCase(String search);

    Page<Movie> findAllByTitleContainingIgnoreCase(String search, Pageable pageable);

//    @Query("FROM Movie WHERE title LIKE CONCAT('%', :search, '%') ORDER BY :sortBy ASC LIMIT ")
//    List<Movie> findALlWithSearchAndPaginationAndSortAsc(@Param("search") String search, @Param("pageNumber") Integer pageNumber,
//                                                      @Param("pageSize") Integer pageSize, @Param("sortBy") String sortBy);
}
