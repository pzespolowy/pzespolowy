package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.dto.*;
import com.musicweb.musicwebserver.model.entity.Review;
import com.musicweb.musicwebserver.model.entity.ReviewSubject;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.service.ReviewService;
import com.musicweb.musicwebserver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
@RequiredArgsConstructor
public class ReviewController {

    private final ModelMapper modelMapper;
    private final ReviewService reviewService;
    private final UserService userService;

    @PostMapping
    public ReviewInfoDto getReviews(@RequestBody ReviewParamsDto reviewParamsDto) {
        ReviewSubject reviewSubject = reviewService.getReviewSubject(reviewParamsDto);
        User currentUser = userService.getCurrentUser();
        Integer currentUserGrade;
        if(currentUser == null) {
            currentUserGrade = null;
        } else {
            currentUserGrade = reviewSubject.getReviews().stream()
                    .filter(review -> review.getUser().equals(userService.getCurrentUser()))
                    .findFirst()
                    .orElse(new Review())
                    .getGrade();
        }
        return ReviewInfoDto.builder()
                .currentUserGrade(currentUserGrade)
                .reviews(reviewSubject.getReviews().stream()
                        .map(review -> modelMapper.map(review, ReviewWithUserDto.class))
                        .toList())
                .averageRanking(reviewSubject.getRanking())
                .build();
    }

    @GetMapping("/currentuser")
    public List<ReviewDto> getCurrentUserReviews() {
        return userService.getCurrentUser().getReviews().stream()
                .map(review -> modelMapper.map(review, ReviewDto.class))
                .toList();
    }

    @PostMapping("/new")
    public void postReview(@RequestBody NewReviewDto newReviewDto) {
        reviewService.postNewReview(newReviewDto);
    }

    @PutMapping
    public void updateReview(@RequestBody NewReviewDto updatedReviewDto) {
        reviewService.updateReview(updatedReviewDto);
    }

}
