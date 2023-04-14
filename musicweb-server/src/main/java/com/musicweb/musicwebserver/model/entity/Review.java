package com.musicweb.musicwebserver.model.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "REVIEW")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne
    private User user;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "GRADE", nullable = false)
    private int grade;

    @Enumerated(EnumType.STRING)
    private ReviewType reviewType;

}
