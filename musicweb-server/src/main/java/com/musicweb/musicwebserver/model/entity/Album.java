package com.musicweb.musicwebserver.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "ALBUM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Album extends ReviewSubject {

    @Id
    @Column(name = "ID_ALBUM")
    private Long id;

    @Builder
    public Album(List<Review> reviews, BigDecimal ranking, Long id) {
        super(reviews, ranking);
        this.id = id;
    }

}
