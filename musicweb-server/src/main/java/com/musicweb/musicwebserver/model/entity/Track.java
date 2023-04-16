package com.musicweb.musicwebserver.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TRACK")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Track extends ReviewSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_TRACK")
    private Long id;

    @OneToMany
    private List<Review> reviews = new ArrayList<>();

    private BigDecimal ranking;

    public void addReview(Review review) {
        this.reviews.add(review);
    }

}
