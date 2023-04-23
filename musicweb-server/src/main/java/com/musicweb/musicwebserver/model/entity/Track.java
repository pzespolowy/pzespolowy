package com.musicweb.musicwebserver.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "TRACK")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Track extends ReviewSubject {

    @Id
    @Column(name = "ID_TRACK")
    private Long id;

    @Builder
    public Track(List<Review> reviews, BigDecimal ranking, Long id) {
        super(reviews, ranking);
        this.id = id;
    }
}
