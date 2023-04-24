package com.musicweb.musicwebserver.strategy

import com.musicweb.musicwebserver.model.entity.Album
import com.musicweb.musicwebserver.model.entity.Review
import com.musicweb.musicwebserver.repository.AlbumRepository
import com.musicweb.musicwebserver.service.AlbumService
import spock.lang.Specification

class AlbumReviewUpdateStrategyTest extends Specification {

//    private AlbumRepository albumRepository = Stub()
//    private AlbumService albumService = new AlbumService(albumRepository)
//    private RankingUpdater rankingUpdater = new RankingUpdater()
//    private AlbumReviewUpdateStrategy albumReviewUpdateStrategy
//            = new AlbumReviewUpdateStrategy(albumService, rankingUpdater)
//
//    def "should update album review correctly"() {
//        given:
//        Long reviewSubjectId = 10L
//        List<Review> reviews = new ArrayList<>()
//        reviews.add(Review.builder()
//                .grade(5)
//                .description("some review")
//                .build())
//        reviews.add(Review.builder()
//                .grade(3)
//                .description("some review")
//                .build())
//        reviews.add(Review.builder()
//                .grade(4)
//                .description("some review")
//                .build())
//        Album oldAlbum = Album.builder()
//                .id(reviewSubjectId)
//                .reviews(reviews)
//                .ranking(BigDecimal.valueOf(4))
//                .build()
//
//        albumRepository.findById(reviewSubjectId) >> Optional.of(oldAlbum)
//
//        Review newReview = Review.builder()
//                .grade(6)
//                .description("some new review")
//                .build()
//
//        List<Review> updatedReviews = new ArrayList<>(reviews)
//        updatedReviews.add(newReview)
//        Album expectedNewAlbum = Album.builder()
//                .id(reviewSubjectId)
//                .reviews(updatedReviews)
//                .ranking(BigDecimal.valueOf(4))
//                .build()
//        albumRepository.save(expectedNewAlbum as Album) >> expectedNewAlbum
//
//        when:
//        Album updatedAlbum = albumReviewUpdateStrategy.updateReviews(newReview, reviewSubjectId)
//
//        then:
//        updatedAlbum.getRanking() == BigDecimal.valueOf(4.5)
//        updatedAlbum.getReviews().any {
//            it.grade == 6
//            it.description == "some new review"
//        }
//    }

}
