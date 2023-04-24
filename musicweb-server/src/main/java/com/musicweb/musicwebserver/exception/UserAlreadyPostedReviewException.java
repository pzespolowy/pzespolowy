package com.musicweb.musicwebserver.exception;

public class UserAlreadyPostedReviewException extends RuntimeException {

    public UserAlreadyPostedReviewException(String message) {
        super(message);
    }
}
