package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.dto.NewReviewDto;
import com.musicweb.musicwebserver.dto.ReviewParamsDto;
import com.musicweb.musicwebserver.exception.UserAlreadyPostedReviewException;
import com.musicweb.musicwebserver.model.ReviewType;
import com.musicweb.musicwebserver.model.entity.*;
import com.musicweb.musicwebserver.repository.ReviewRepository;
import com.musicweb.musicwebserver.strategy.RankingUpdateStrategyFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
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
        newReview.setUser(currentUser);
        reviewRepository.save(newReview);
        currentUser.addReview(newReview);
        userService.updateUser(currentUser);

        rankingUpdateStrategyFactory.getRankingUpdateStrategy(newReviewDto.getReviewType())
                .updateReviews(newReview, newReviewDto.getReviewSubjectId());
    }

    public ReviewSubject getReviewSubject(ReviewParamsDto reviewParamsDto) {
        ReviewSubject reviewSubject = null;
        if(reviewParamsDto.getReviewType().equals(ReviewType.TRACK)) {
            reviewSubject = trackService.getTrackById(Long.valueOf(reviewParamsDto.getReviewSubjectId()));
        } else if(reviewParamsDto.getReviewType().equals(ReviewType.ALBUM)){
            reviewSubject = albumService.getAlbumById(Long.valueOf(reviewParamsDto.getReviewSubjectId()));
        }

        return reviewSubject;
    }

    private void checkIfUserAlreadyPostedReview(NewReviewDto newReviewDto, Review review) {
        if(matchingReviewFound(newReviewDto, review)) {
            throw new UserAlreadyPostedReviewException("This user has already posted a review for this review subject");
        }
    }

    private boolean matchingReviewFound(NewReviewDto newReviewDto, Review review) {
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

    @Transactional
    public void updateReview(NewReviewDto updatedReviewDto) {
        User currentUser = userService.getCurrentUser();
        currentUser.getReviews().forEach(
                review -> {
                    if(matchingReviewFound(updatedReviewDto, review)) {

                        recalculateAvg(updatedReviewDto, review);

                        review.setPostedAt(LocalDateTime.now());
                        review.setGrade(updatedReviewDto.getGrade());
                        review.setDescription(updatedReviewDto.getDescription());
                    }
                }
        );


    }

    private void recalculateAvg(NewReviewDto updatedReviewDto, Review review) {
        if(updatedReviewDto.getReviewType().equals(ReviewType.TRACK)) {
            Track track = trackService.getTrackById(updatedReviewDto.getReviewSubjectId());

            BigDecimal currentSum = track.getRanking().multiply(BigDecimal.valueOf(track.getReviews().size()));
            BigDecimal oldSum = currentSum.subtract(BigDecimal.valueOf(review.getGrade()));
            BigDecimal newSum = oldSum.add(BigDecimal.valueOf(updatedReviewDto.getGrade()));
            BigDecimal newAvg = newSum.divide(BigDecimal.valueOf(track.getReviews().size()), RoundingMode.DOWN);
            track.setRanking(newAvg);
            trackService.updateTrack(track);
        } else if(updatedReviewDto.getReviewType().equals(ReviewType.ALBUM)) {
            Album album = albumService.getAlbumById(updatedReviewDto.getReviewSubjectId());

            BigDecimal currentSum = album.getRanking().multiply(BigDecimal.valueOf(album.getReviews().size()));
            BigDecimal oldSum = currentSum.subtract(BigDecimal.valueOf(review.getGrade()));
            BigDecimal newSum = oldSum.add(BigDecimal.valueOf(updatedReviewDto.getGrade()));
            BigDecimal newAvg = newSum.divide(BigDecimal.valueOf(album.getReviews().size()), RoundingMode.DOWN);
            album.setRanking(newAvg);
            albumService.updateAlbum(album);
        }
    }
}
