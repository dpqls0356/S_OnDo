package com.clio.ondo.global.auth;

import java.io.IOException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
		try {
			if (token != null) {
				Claims claims = jwtTokenProvider.decodeJwt(token);
				if (jwtTokenProvider.validateToken(token)) {
					if (jwtTokenProvider.hasClaim(claims, "type", "access")) {
						Authentication authentication = jwtTokenProvider.getAuthentication(token);
						SecurityContextHolder.getContext().setAuthentication(authentication);
					} else {
						handleRefreshToken(request, response, filterChain, claims);
						log.error("refresh 토큰 처리완료");
						return;
					}
				}
			}
		} catch (ExpiredJwtException e) {
			handleExpiredToken(request, response, token, e);
		} catch (RedisConnectionFailureException e) {
			log.error("Redis 연결 오류 시 로그아웃");
			SecurityContextHolder.clearContext();
		}
		filterChain.doFilter(request, response);
	}

	private void handleRefreshToken(HttpServletRequest request, HttpServletResponse response,
									FilterChain filterChain, Claims claims) throws IOException, ServletException {
		String requestURI = request.getRequestURI();
		if ("/api/v1/member/reissue".equals(requestURI)) {
			filterChain.doFilter(request, response);
		} else {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token use.");
		}
	}

	private void handleExpiredToken(HttpServletRequest request, HttpServletResponse response,
									String token, ExpiredJwtException e) throws IOException {
		Claims claims = e.getClaims();
		if (claims != null && jwtTokenProvider.hasClaim(claims, "type", "access")) {
			// Access Token이 만료된 경우
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 토큰입니다.");
		} else {
			// Refresh Token이 만료된 경우 로그아웃 처리
			log.error("Refresh 토큰이 만료되었습니다.", e);
			SecurityContextHolder.clearContext();
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 토큰입니다.");
		}
	}
}
