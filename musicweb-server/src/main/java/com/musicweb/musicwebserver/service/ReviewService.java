package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.dto.NewReviewDto;
import com.musicweb.musicwebserver.dto.ReviewParamsDto;
import com.musicweb.musicwebserver.exception.UserAlreadyPostedReviewException;
import com.musicweb.musicwebserver.model.ReviewType;
import com.musicweb.musicwebserver.model.entity.Review;
import com.musicweb.musicwebserver.model.entity.ReviewSubject;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.repository.ReviewRepository;
import com.musicweb.musicwebserver.strategy.RankingUpdateStrategyFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final RankingUpdateStrategyFactory rankingUpdateStrategyFactory;
    private final AlbumService albumService;
    private final TrackService trackService;

    @Transactional
    public void postNewReview(NewReviewDto newReviewDto) {
        User currentUser = userService.getCurrentUser();
        currentUser.getReviews().forEach(review -> checkIfUserAlreadyPostedReview(newReviewDto, review));

        Review newReview = createNewReview(newReviewDto);
        reviewRepository.save(newReview);
        currentUser.addReview(newReview);
        userService.updateUser(currentUser);

        rankingUpdateStrategyFactory.getRankingUpdateStrategy(newReviewDto.getReviewType())
                .updateReviews(newReview, newReviewDto.getReviewSubjectId());
    }

    private static void checkIfUserAlreadyPostedReview(NewReviewDto newReviewDto, Review review) {
        if(userAlreadyPostedReview(newReviewDto, review)) {
            throw new UserAlreadyPostedReviewException("This user has already posted a review for this review subject");
        }
    }

    private static boolean userAlreadyPostedReview(NewReviewDto newReviewDto, Review review) {
        return review.getReviewType().equals(newReviewDto.getReviewType())
                && Objects.equals(review.getReviewSubjectId(), newReviewDto.getReviewSubjectId());
    }

    private Review createNewReview(NewReviewDto newReviewDto) {
        return Review.builder()
                .postedAt(LocalDateTime.now())
                .grade(newReviewDto.getGrade())
                .description(newReviewDto.getDescription())
//                .user(userService.getCurrentUser())
                .reviewType(newReviewDto.getReviewType())
                .reviewSubjectId(newReviewDto.getReviewSubjectId())
                .build();
    }

    public List<Review> getReviewsFor(ReviewParamsDto reviewParamsDto) {
        ReviewSubject reviewSubject = null;
        if(reviewParamsDto.getReviewType().equals(ReviewType.TRACK)) {
            reviewSubject = trackService.getTrackById(Long.valueOf(reviewParamsDto.getReviewSubjectId()));
        } else if(reviewParamsDto.getReviewType().equals(ReviewType.ALBUM)){
            reviewSubject = albumService.getAlbumById(Long.valueOf(reviewParamsDto.getReviewSubjectId()));
        }

        return reviewSubject.getReviews();
    }
}
