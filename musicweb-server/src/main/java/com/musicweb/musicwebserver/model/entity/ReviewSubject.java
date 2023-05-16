package com.musicweb.musicwebserver.model.entity;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public abstract class ReviewSubject {

    @OneToMany
    protected List<Review> reviews = new ArrayList<>();
    protected BigDecimal ranking = BigDecimal.ZERO;

    @Transient
    private Boolean isFavorite;

    public void addReview(Review review) {
        this.reviews.add(review);
    }

}
