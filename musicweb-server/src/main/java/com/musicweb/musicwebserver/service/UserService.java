package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.config.security.CustomUserDetails;
import com.musicweb.musicwebserver.dto.UpdatedUserDto;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
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

    @Transactional
    public void deleteCurrentUser() {
        this.userRepository.delete(getCurrentUser());
        authService.logout();
    }

    public void updateCurrentUserInfo(User updatedUser) {
        User currentUser = getCurrentUser();

        if(updatedUser.getName() != null) {
            currentUser.setName(updatedUser.getName());
        }

        if(updatedUser.getSurname() != null) {
            currentUser.setSurname(updatedUser.getSurname());
        }

        if(updatedUser.getNickname() != null) {
            currentUser.setNickname(updatedUser.getNickname());
        }

        if(updatedUser.getPassword() != null) {
            currentUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        userRepository.save(currentUser);
    }

}
