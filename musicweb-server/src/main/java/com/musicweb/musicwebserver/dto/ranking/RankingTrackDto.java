package com.musicweb.musicwebserver.dto.ranking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RankingTrackDto {

    private Long id;
    private BigDecimal ranking;
    private List<RankingReviewDto> reviews;

}
