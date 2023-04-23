package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.config.security.CustomUserDetails;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return userRepository.findById(customUserDetails.getCurrentUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("User with this ID not found."));
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

}
