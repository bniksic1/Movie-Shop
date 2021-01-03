package com.example.demo;

public class Movie {
    private Integer id, rating, runtime;
    private String title, genre, dateRelease, description, imgCoverLink, director;

    public Movie(Integer id, String title,String genre, Integer rating, String director, Integer runtime, String dateRelease, String description, String imgCoverLink) {
        this.id = id;
        this.rating = rating;
        this.title = title;
        this.genre = genre;
        this.dateRelease = dateRelease;
        this.description = description;
        this.imgCoverLink = imgCoverLink;
        this.director = director;
        this.runtime = runtime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public String getDateRelease() {
        return dateRelease;
    }

    public void setDateRelease(String dateRelease) {
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
}
