package com.musicweb.musicwebserver.model.entity;


import com.musicweb.musicwebserver.model.ReviewType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "REVIEW")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_USER", nullable = false)
    private User user;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "GRADE", nullable = false)
    private int grade;

    @Column(name = "POSTED_AT", nullable = false)
    private LocalDateTime postedAt;

    @Column(name = "REVIEW_TYPE")
    @Enumerated(EnumType.STRING)
    private ReviewType reviewType;

    @Column(name = "ID_REVIEW_SUBJECT")
    private Long reviewSubjectId;

}
