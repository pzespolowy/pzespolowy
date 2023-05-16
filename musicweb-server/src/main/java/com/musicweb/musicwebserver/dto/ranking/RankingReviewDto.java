package com.musicweb.musicwebserver.dto.ranking;

import com.musicweb.musicwebserver.model.ReviewType;
import com.musicweb.musicwebserver.model.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankingReviewDto {

    private Long id;
    private RankingUserDto user;
    private String description;
    private int grade;
    private LocalDateTime postedAt;
    private ReviewType reviewType;
    private Long reviewSubjectId;
}
