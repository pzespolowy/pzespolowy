package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.dto.NewReviewDto;
import com.musicweb.musicwebserver.dto.ReviewDto;
import com.musicweb.musicwebserver.dto.ReviewParamsDto;
import com.musicweb.musicwebserver.service.ReviewService;
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

    @PostMapping
    public List<ReviewDto> getReviews(@RequestBody ReviewParamsDto reviewParamsDto) {
        return reviewService.getReviewsFor(reviewParamsDto).stream()
                .map(review -> modelMapper.map(review, ReviewDto.class))
                .toList();
    }

    @PostMapping("/new")
    public void postReview(@RequestBody NewReviewDto newReviewDto) {
        reviewService.postNewReview(newReviewDto);
    }

}
