package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.model.ReviewType;
import com.musicweb.musicwebserver.model.entity.Review;
import com.musicweb.musicwebserver.repository.ReviewRepository;
import com.musicweb.musicwebserver.strategy.RankingUpdateStrategyFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final RankingUpdateStrategyFactory rankingUpdateStrategyFactory;

    @Transactional
    public void postReview(Review review, Long reviewSubjectId, ReviewType reviewType) {
        review.setUser(userService.getCurrentUser());

        rankingUpdateStrategyFactory.createRankingUpdateStrategy(reviewType)
                .updateReviews(review, reviewSubjectId);

        review.setPostedAt(LocalDateTime.now());
        reviewRepository.save(review);
    }

}
