package com.musicweb.musicwebserver.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rankings")
@CrossOrigin
@RequiredArgsConstructor
public class RankingController {

    @GetMapping
    public void getRanking() {

    }

}
