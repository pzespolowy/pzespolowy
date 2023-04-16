package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.config.security.CustomUserDetails;
import com.musicweb.musicwebserver.model.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public User getCurrentUser() {
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return customUserDetails.getUser();
    }

}
