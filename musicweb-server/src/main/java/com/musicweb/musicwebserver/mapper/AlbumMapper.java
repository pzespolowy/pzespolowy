package com.musicweb.musicwebserver.mapper;

import com.musicweb.musicwebserver.dto.AlbumDto;
import com.musicweb.musicwebserver.dto.ReviewDto;
import com.musicweb.musicwebserver.dto.UserDto;
import com.musicweb.musicwebserver.model.entity.Album;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlbumMapper {

    private final ModelMapper modelMapper;

    public AlbumDto mapToAlbumDto(Album album) {
        return AlbumDto.builder()
                .id(album.getId())
                .ranking(album.getRanking())
                .reviews(album.getReviews().stream()
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
