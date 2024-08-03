package com.clio.ondo.domain.counselor.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselor.model.dto.CounselorLoginRequestDto;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CounselorServiceImpl implements CounselorService {

    private final JwtTokenProvider jwtTokenProvider;
    private final DaoAuthenticationProvider counselorAuthenticationProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public TokenDto login(CounselorLoginRequestDto loginRequestDto) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(loginRequestDto.getId(), loginRequestDto.getPassword());

        Authentication authentication = counselorAuthenticationProvider.authenticate(authToken);

        String accessToken = jwtTokenProvider.generateAccessToken(authentication);
        String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);

        return new TokenDto(accessToken, refreshToken);
    }
}
