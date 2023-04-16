package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.dto.ReviewDto;
import com.musicweb.musicwebserver.model.entity.Review;
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
    public void postReview(@RequestBody ReviewDto reviewDto) {
        reviewService.postReview(modelMapper.map(reviewDto, Review.class),
                reviewDto.getReviewSubjectId(),
                reviewDto.getReviewType());
    }

}
