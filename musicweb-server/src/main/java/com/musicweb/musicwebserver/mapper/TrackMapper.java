package com.musicweb.musicwebserver.mapper;

import com.musicweb.musicwebserver.dto.ReviewDto;
import com.musicweb.musicwebserver.dto.TrackDto;
import com.musicweb.musicwebserver.dto.UserDto;
import com.musicweb.musicwebserver.model.entity.Track;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TrackMapper {

    private final ModelMapper modelMapper;

    public TrackDto mapToTrackDto(Track track) {
        return TrackDto.builder()
                .id(track.getId())
                .ranking(track.getRanking())
                .reviews(track.getReviews().stream()
                        .map(review -> ReviewDto.builder()
                                .postedAt(review.getPostedAt())
                                .reviewSubjectId(review.getReviewSubjectId())
                                .reviewType(review.getReviewType())
                                .userDto(modelMapper.map(review.getUser(), UserDto.class))
                                .description(review.getDescription())
                                .grade(review.getGrade())
                                .build())
                        .toList())
                .build();
    }

}
