package com.musicweb.musicwebserver.strategy

import spock.lang.Specification

class RankingUpdaterTest extends Specification {

    private RankingUpdater rankingUpdater = new RankingUpdater()

    def "should update ranking correctly"() {
        expect:
        rankingUpdater.getUpdatedRanking(grade, BigDecimal.valueOf(oldAverageRanking), numberOfReviews)
                == expectedNewAverageRanking

        where:
        oldAverageRanking | numberOfReviews | grade | expectedNewAverageRanking
        8.0               | 3               | 4     | 7.0
        5.25              | 4               | 8     | 5.8
        0.0               | 0               | 5     | 5.0
        10.0              | 1               | 0     | 5.0
    }

}
