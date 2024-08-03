package com.clio.ondo.global.auth.jwtUtil;

import java.io.IOException;

import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.clio.ondo.global.exception.auth.JwtTokenNotValidException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;
	private static final String[] EXCLUDE_URLS = {
			"/api/v1/member/join",
			"/api/v1/member/login",
			"/api/v1/member/reissue",
			"/api/v1/member/oauth-success",
			"/api/v1/counselor/login",
			"/api/v1/counselor/join"
	};
	private boolean isExcludedUrl(String requestURI) {
		for (String excludeUrl : EXCLUDE_URLS) {
			if (excludeUrl.equals(requestURI)) {
				return true;
			}
		}
		return false;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String requestURI = request.getRequestURI();
		if (isExcludedUrl(requestURI)) {
			filterChain.doFilter(request, response);
			return;
		}

		String accessToken = jwtTokenProvider.getJwtTokenFromCookies(request, "accessToken");
		String refreshToken = jwtTokenProvider.getJwtTokenFromCookies(request, "refreshToken");
		try {
			if (accessToken != null) {
				Claims claims = jwtTokenProvider.decodeJwt(accessToken);
				if (jwtTokenProvider.validateToken(accessToken) && jwtTokenProvider.isTokenBlacklisted(accessToken)) {
					String role = claims.get("role",String.class);
					Authentication authentication;
					if (role.equals("COUNSELOR")) {
						authentication = jwtTokenProvider.getCounselorAuthentication(accessToken);
					} else {
						authentication = jwtTokenProvider.getMemberAuthentication(accessToken);
					}
					SecurityContextHolder.getContext().setAuthentication(authentication);
				} else {
					handleRefreshToken(request, response, filterChain, claims);
					return;
				}
			} else {
				throw new JwtTokenNotValidException("유효하지 않은 토큰입니다.");
			}
		} catch (RedisConnectionFailureException e) {
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

//	private void handleExpiredToken(HttpServletRequest request, HttpServletResponse response,
//									String token, ExpiredJwtException e) throws IOException {
//		Claims claims = e.getClaims();
//		if (claims != null && jwtTokenProvider.hasClaim(claims, "type", "access")) {
//			// Access Token이 만료된 경우
//			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 토큰입니다.");
//		} else {
//			// Refresh Token이 만료된 경우 로그아웃 처리
//			log.error("Refresh 토큰이 만료되었습니다.", e);
//			SecurityContextHolder.clearContext();
//			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 토큰입니다.");
//		}
//	}
}
