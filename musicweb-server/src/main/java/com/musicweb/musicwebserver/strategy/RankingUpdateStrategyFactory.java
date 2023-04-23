package com.musicweb.musicwebserver.strategy;

import com.musicweb.musicwebserver.model.ReviewType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RankingUpdateStrategyFactory {

    private final TrackReviewUpdateStrategy trackRankingUpdateStrategy;
    private final AlbumReviewUpdateStrategy albumReviewUpdateStrategy;

    public ReviewUpdateStrategy<?> getRankingUpdateStrategy(ReviewType reviewType) {
        return switch (reviewType) {
            case TRACK -> trackRankingUpdateStrategy;
            case ALBUM -> albumReviewUpdateStrategy;
        };
    }

}
