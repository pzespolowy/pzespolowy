package com.musicweb.musicwebserver.strategy;

import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.model.entity.Review;
import com.musicweb.musicwebserver.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlbumReviewUpdateStrategy implements ReviewUpdateStrategy<Album> {

    private final AlbumService albumService;
    private final RankingUpdater rankingUpdater;

    @Override
    public Album updateReviews(Review review, Long reviewSubjectId) {
        Album album = albumService.getAlbumById(reviewSubjectId);

        album.setRanking(rankingUpdater
                .getUpdatedRanking(review.getGrade(), album.getRanking(), album.getReviews().size()));
        album.addReview(review);
        return albumService.updateAlbum(album);
    }

}
