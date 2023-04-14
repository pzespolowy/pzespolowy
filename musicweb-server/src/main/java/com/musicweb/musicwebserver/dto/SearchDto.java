package com.musicweb.musicwebserver.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SearchDto {

    private String q;
    private int limit;
}
