package com.musicweb.musicwebserver.model.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "TRACK")
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_TRACK")
    private Long id;

    @OneToMany
    private List<Review> review;

}
