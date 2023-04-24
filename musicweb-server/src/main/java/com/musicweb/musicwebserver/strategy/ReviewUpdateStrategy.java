package com.musicweb.musicwebserver.strategy;

import com.musicweb.musicwebserver.model.entity.Review;
import com.musicweb.musicwebserver.model.entity.ReviewSubject;

public interface ReviewUpdateStrategy<T extends ReviewSubject> {

    T updateReviews(Review review, Long reviewSubjectId);

}
