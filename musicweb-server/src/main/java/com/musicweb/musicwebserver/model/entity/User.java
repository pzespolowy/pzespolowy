package com.musicweb.musicwebserver.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;


@Entity
@Table(name = "_USER")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_USER")
    private Long id;

    @Column(name = "NICKNAME")
    private String nickname;

    @Column(name = "NAME")
    private String name;

    @Column(name = "SURNAME")
    private String surname;

    @Column(name = "login")
    private String email;

    @Column(name = "password")
    private String password;

    @OneToMany
    private List<Review> reviews;

    @OneToMany
    private List<Track> favouriteTracks;

    @OneToMany
    private List<Album> favouriteAlbums;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLE",
            joinColumns = @JoinColumn(name = "ID_USER"),
            inverseJoinColumns = @JoinColumn(name = "ID_ROLE"))
    private Set<Role> roles;

    public void addReview(Review review) {
        this.reviews.add(review);
    }

    public void addFavouriteTrack(Track track) {
        this.favouriteTracks.add(track);
    }

    public void removeFavouriteTrack(Track track) {
        this.favouriteTracks.remove(track);
    }

    public void addFavouriteAlbum(Album album) {
        this.favouriteAlbums.add(album);
    }

    public void removeFavouriteAlbum(Album album) {
        this.favouriteAlbums.remove(album);
    }

}
