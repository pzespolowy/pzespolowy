package com.musicweb.musicwebserver.strategy

import com.musicweb.musicwebserver.model.entity.Review
import com.musicweb.musicwebserver.model.ReviewType
import com.musicweb.musicwebserver.model.entity.Track
import com.musicweb.musicwebserver.repository.TrackRepository
import com.musicweb.musicwebserver.service.TrackService
import spock.lang.Specification

class TrackReviewUpdateStrategyTest extends Specification {

    private TrackRepository trackRepository = Stub()
    private TrackService trackService = new TrackService(trackRepository)
    private TrackReviewUpdateStrategy trackReviewUpdateStrategy = new TrackReviewUpdateStrategy(trackService)

    def "should update track ranking correctly"() {
        given:
        List<Review> mockedReviews = new ArrayList<>()
        mockedReviews.add(new Review())
        mockedReviews.add(new Review())
        mockedReviews.add(new Review())
        Track mockedTrack = Track.builder()
                .id(111222333L)
                .ranking(BigDecimal.valueOf(oldAverageRanking))
                .reviews(mockedReviews)
                .build()
        trackRepository.findById(_ as Long) >> Optional.of(mockedTrack)

        Review newReview = Review.builder()
                .reviewType(ReviewType.TRACK)
                .grade(newRanking)
                .build()

        when:
        trackReviewUpdateStrategy.updateReviews(newReview, 111222333L)

        then:
        mockedTrack.getRanking() == BigDecimal.valueOf(expectedNewAverageRanking)

        where:
        oldAverageRanking | numOfReviews | newRanking | expectedNewAverageRanking
        8.0               | 3            | 4          | 7.0

    }

}
