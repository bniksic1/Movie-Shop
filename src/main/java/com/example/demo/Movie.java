package com.example.demo;

import lombok.*;

import javax.persistence.*;

import java.sql.Date;

import static javax.persistence.GenerationType.SEQUENCE;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity(name = "Movie")
public class Movie {
    @Id
    @SequenceGenerator(
            name = "movie_sequence",
            sequenceName = "movie_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "movie_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "title",
            nullable = false
    )
    private String title;

    @Column(
            name = "genre",
            nullable = false
    )
    private String genre;

    @Column(
            name = "date_release",
            nullable = false
    )
    private Date dateRelease;

    @Column(
            name = "director",
            nullable = false
    )
    private String director;

    @Column(
            name = "description",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(
            name = "img_cover_link",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String imgCoverLink;

    @Column(
            name = "rating",
            nullable = false,
            columnDefinition = "SMALLINT"

    )
    private Integer rating;

    @Column(
            name = "runtime",
            nullable = false,
            columnDefinition = "SMALLINT"

    )
    private Integer runtime;
}
