package com.musicweb.musicwebserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlbumDto {

    private Long id;
    private List<ReviewDto> reviews;
    private BigDecimal ranking;
    private Boolean isFavorite;
}
