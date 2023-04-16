package com.musicweb.musicwebserver.service

import com.musicweb.musicwebserver.model.entity.Review
import com.musicweb.musicwebserver.model.ReviewType
import com.musicweb.musicwebserver.model.entity.User
import com.musicweb.musicwebserver.repository.ReviewRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import spock.lang.Specification

@DataJpaTest
class ReviewServiceTest extends Specification {

    @Autowired
    private ReviewRepository reviewRepository

    private ReviewService reviewService = new ReviewService(reviewRepository)

    def "should add review correctly"() {
        given:
        User mockedUser = User.builder()
                .id(1L)
                .build()
        List<Review> mockedUserReviews = List.of(
                Review.builder()
                        .id(1L)
                        .grade(7)
                        .description("Some mocked old review 1")
                        .user(mockedUser)
                        .build(),
                Review.builder()
                        .id(2L)
                        .grade(5)
                        .description("Some mocked old review 2")
                        .user(mockedUser)
                        .build(),
                Review.builder()
                        .id(3L)
                        .grade(2)
                        .description("Some mocked old review 3")
                        .user(mockedUser)
                        .build()
        )
        mockedUser.setReviews(mockedUserReviews)

        Review newReview = Review.builder()
                .reviewType(ReviewType.TRACK)
                .grade(6)
                .description("Very nice track")
                .user(mockedUser)
                .build()

        Long reviewSubjectId = 10L

        when:
        reviewService.postReview(newReview, reviewSubjectId)

        then:
        re

    }

}
