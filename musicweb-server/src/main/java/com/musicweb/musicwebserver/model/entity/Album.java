package com.musicweb.musicwebserver.model.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "ALBUM")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_ALBUM")
    private Long id;

    @OneToMany
    private List<Review> review;

}
