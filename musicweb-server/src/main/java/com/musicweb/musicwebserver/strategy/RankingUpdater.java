package com.musicweb.musicwebserver.strategy;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class RankingUpdater {

    public BigDecimal getUpdatedRanking(int newGrade, BigDecimal oldAverageRanking, int numberOfReviews) {
        return oldAverageRanking
                .multiply(BigDecimal.valueOf(numberOfReviews))
                .add(BigDecimal.valueOf(newGrade))
                .divide(BigDecimal.valueOf(numberOfReviews + 1), RoundingMode.DOWN);
    }

}
