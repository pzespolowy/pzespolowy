package com.musicweb.musicwebserver.repository;

import com.musicweb.musicwebserver.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
