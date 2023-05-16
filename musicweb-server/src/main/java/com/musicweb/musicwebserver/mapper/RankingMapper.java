package com.musicweb.musicwebserver.mapper;

import com.musicweb.musicwebserver.dto.ranking.RankingAlbumDto;
import com.musicweb.musicwebserver.dto.ranking.RankingReviewDto;
import com.musicweb.musicwebserver.dto.ranking.RankingTrackDto;
import com.musicweb.musicwebserver.dto.ranking.RankingUserDto;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.model.entity.Review;
import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.model.entity.User;
import org.springframework.stereotype.Component;

@Component
public class RankingMapper {

    public RankingTrackDto mapToRankingTrackDto(Track track) {
        return RankingTrackDto.builder()
                .id(track.getId())
                .ranking(track.getRanking())
                .reviews(track.getReviews().stream().map(this::mapToRankingReviewDto).toList())
                .build();
    }

    public RankingAlbumDto mapToAlbumRankingDto(Album album) {
        return RankingAlbumDto.builder()
                .id(album.getId())
                .ranking(album.getRanking())
                .reviews(album.getReviews().stream().map(this::mapToRankingReviewDto).toList())
                .build();
    }

    private RankingReviewDto mapToRankingReviewDto(Review review) {
        return RankingReviewDto.builder()
                .id(review.getId())
                .user(rankingUserDto(review.getUser()))
                .reviewType(review.getReviewType())
                .description(review.getDescription())
                .postedAt(review.getPostedAt())
                .grade(review.getGrade())
                .reviewSubjectId(review.getReviewSubjectId())
                .build();
    }

    private RankingUserDto rankingUserDto(User user) {
        return RankingUserDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .name(user.getName())
                .surname(user.getSurname())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }

}
