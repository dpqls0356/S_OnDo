package com.clio.ondo.domain.counselor.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

	private final RedisTemplate<String, String> redisTemplate;
	private final JwtTokenProvider jwtTokenProvider;
	@Qualifier("counselorAuthenticationManager")
	private final AuthenticationManager counselorAuthenticationManager;
	private final PasswordEncoder passwordEncoder;

	@Override
	public TokenDto login(CounselorLoginRequestDto loginRequestDto) throws AuthenticationException {
		Authentication authentication = counselorAuthenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				loginRequestDto.getId(),
				loginRequestDto.getPassword()
			)
		);
		String accessToken = jwtTokenProvider.generateAccessToken(authentication);
		String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);

		return new TokenDto(accessToken, refreshToken);
	}
}
