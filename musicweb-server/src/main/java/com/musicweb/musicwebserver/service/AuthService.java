package com.musicweb.musicwebserver.service;


import com.musicweb.musicwebserver.config.security.CustomUserDetails;
import com.musicweb.musicwebserver.config.security.JwtService;
import com.musicweb.musicwebserver.dto.auth.AuthenticationResponseDto;
import com.musicweb.musicwebserver.dto.auth.LoginRequestDto;
import com.musicweb.musicwebserver.dto.auth.RegisterRequestDto;
import com.musicweb.musicwebserver.model.RoleEnum;
import com.musicweb.musicwebserver.model.TokenType;
import com.musicweb.musicwebserver.model.entity.Role;
import com.musicweb.musicwebserver.model.entity.Token;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.repository.TokenRepository;
import com.musicweb.musicwebserver.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponseDto register(RegisterRequestDto registerRequestDto) {
        User newUser = User.builder()
                .email(registerRequestDto.getEmail())
                .password(passwordEncoder.encode(registerRequestDto.getPassword()))
                .roles(Set.of(new Role(RoleEnum.ROLE_USER)))
                .build();

        User savedUser = userRepository.save(newUser);

        String jwtToken = jwtService.generateToken(new CustomUserDetails(newUser));
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponseDto.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponseDto login(LoginRequestDto loginRequestDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmail(),
                        loginRequestDto.getPassword()
                )
        );
        User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User with this email not found!"));
        String jwtToken = jwtService.generateToken(new CustomUserDetails(user));
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponseDto.builder()
                .token(jwtToken)
                .build();
    }

    public void logout() {

    }

    private void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

}
