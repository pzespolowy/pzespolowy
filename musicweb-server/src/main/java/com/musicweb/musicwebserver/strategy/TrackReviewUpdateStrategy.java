package com.musicweb.musicwebserver.strategy;

import com.musicweb.musicwebserver.model.entity.Review;
import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.service.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TrackReviewUpdateStrategy implements ReviewUpdateStrategy<Track> {

    private final TrackService trackService;
    private final RankingUpdater rankingUpdater;

    @Override
    public Track updateReviews(Review review, Long reviewSubjectId) {
        Track track = trackService.getTrackById(reviewSubjectId);

        track.setRanking(rankingUpdater
                .getUpdatedRanking(review.getGrade(), track.getRanking(), track.getReviews().size()));
        track.addReview(review);
        return trackService.updateTrack(track);
    }

}
