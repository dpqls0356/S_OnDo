package com.clio.ondo.global.auth.OAuth;

import java.io.IOException;

import jakarta.servlet.http.Cookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

	private final JwtTokenProvider tokenProvider;
	private static final String URI = "http://localhost:5173/member/oauth-callback"; // 리디렉트할 클라이언트 URL

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
										Authentication authentication) throws IOException, ServletException {

		String accessToken = tokenProvider.generateAccessToken(authentication);
		String refreshToken = tokenProvider.generateRefreshToken(authentication);

		// 쿠키로 토큰 설정
		Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
		accessTokenCookie.setHttpOnly(true); // JavaScript에서 접근 불가
		accessTokenCookie.setPath("/");
		accessTokenCookie.setMaxAge(3600*24*30); // 30일 유효기간

		Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(7 * 24 * 3600 * 5); // 5주 유효기간

		response.addCookie(accessTokenCookie);
		response.addCookie(refreshTokenCookie);

		// 클라이언트의 특정 페이지로 리디렉트
		String redirectUrl = UriComponentsBuilder.fromUriString(URI)
				.queryParam("accessToken", accessToken)
				.queryParam("refreshToken", refreshToken)
				.build().toUriString();

		response.sendRedirect(redirectUrl);
	}
}
