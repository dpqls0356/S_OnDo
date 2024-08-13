package com.clio.ondo.global.auth.OAuth;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Component
@Slf4j
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

	private final JwtTokenProvider tokenProvider;
	private static final String URI = "http://localhost:5173/oauth-callback"; // 클라이언트의 OAuth 콜백 URL

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		String accessToken = tokenProvider.generateAccessToken(authentication);
		String refreshToken = tokenProvider.generateRefreshToken(authentication);
		log.error("Access token: " + accessToken);
		log.error("Access token: " + accessToken);
		log.error("Access token: " + accessToken);
		log.error("Access token: " + accessToken);
		String redirectUrl = UriComponentsBuilder.fromUriString(URI)
			.queryParam("accessToken", accessToken)
			.queryParam("refreshToken", refreshToken)
			.build().toUriString();

		response.sendRedirect(redirectUrl);
	}
}

