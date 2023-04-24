package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.dto.NewReviewDto;
import com.musicweb.musicwebserver.dto.ReviewDto;
import com.musicweb.musicwebserver.dto.ReviewInfoDto;
import com.musicweb.musicwebserver.dto.ReviewParamsDto;
import com.musicweb.musicwebserver.model.entity.ReviewSubject;
import com.musicweb.musicwebserver.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
@RequiredArgsConstructor
public class ReviewController {

    private final ModelMapper modelMapper;
    private final ReviewService reviewService;

    @PostMapping
    public ReviewInfoDto getReviews(@RequestBody ReviewParamsDto reviewParamsDto) {
        ReviewSubject reviewSubject = reviewService.getReviewsSubject(reviewParamsDto);
        return ReviewInfoDto.builder()
                .reviews(reviewSubject.getReviews().stream()
                        .map(review -> modelMapper.map(review, ReviewDto.class))
                        .toList())
                .averageRanking(reviewSubject.getRanking())
                .build();
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
