package com.example.demo.domain;

import javax.persistence.*;

import java.sql.Date;

import static javax.persistence.GenerationType.SEQUENCE;

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

    public Movie(String title,String genre, Integer rating, String director, Integer runtime, Date dateRelease, String description, String imgCoverLink) {
        this.rating = rating;
        this.title = title;
        this.genre = genre;
        this.dateRelease = dateRelease;
        this.description = description;
        this.imgCoverLink = imgCoverLink;
        this.director = director;
        this.runtime = runtime;
    }

    public Movie() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Date getDateRelease() {
        return dateRelease;
    }

    public void setDateRelease(Date dateRelease) {
        this.dateRelease = dateRelease;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgCoverLink() {
        return imgCoverLink;
    }

    public void setImgCoverLink(String imgCoverLink) {
        this.imgCoverLink = imgCoverLink;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", dateRelease='" + dateRelease + '\'' +
                ", director='" + director + '\'' +
                ", description='" + description + '\'' +
                ", imgCoverLink='" + imgCoverLink + '\'' +
                ", rating=" + rating +
                ", runtime=" + runtime +
                '}';
    }
}
