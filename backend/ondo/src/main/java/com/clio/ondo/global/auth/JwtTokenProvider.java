package com.clio.ondo.global.auth;

import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

	private final RedisTemplate<String, String> redisTemplate;
	private final UserDetailsServiceImpl userDetailsService;

	@Value("${spring.jwt.access-token-expiration}")
	private long accessTokenExpirationTime;

	@Value("${spring.jwt.refresh-token-expiration}")
	private long refreshTokenExpirationTime;

	@Value("${spring.jwt.secret}")
	private String secret;

	@PostConstruct
	protected void init() {
		secret = Base64.getEncoder().encodeToString(secret.getBytes());
	}

	public String generateAccessToken(Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Claims claims = Jwts.claims().setSubject(userDetails.getEmail());
		Date now = new Date();
		Date expireDate = new Date(now.getTime() + accessTokenExpirationTime);

		return Jwts.builder()
			.setClaims(claims)
			.claim("role", userDetails.getRole())
			.claim("type", "access")
			.setIssuedAt(now)
			.setExpiration(expireDate)
			.signWith(SignatureAlgorithm.HS512, secret)
			.compact();
	}

	public String generateRefreshToken(Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Claims claims = Jwts.claims().setSubject(userDetails.getEmail());
		Date now = new Date();
		Date expireDate = new Date(now.getTime() + refreshTokenExpirationTime);

		String refreshToken = Jwts.builder()
			.setClaims(claims)
			.claim("role", userDetails.getRole())
			.setIssuedAt(now)
			.setExpiration(expireDate)
			.signWith(SignatureAlgorithm.HS512, secret)
			.compact();
		String key = "refresh-token:" + userDetails.getEmail();
		redisTemplate.opsForValue().set(
			key,
			refreshToken,
			refreshTokenExpirationTime,
			TimeUnit.MILLISECONDS
		);
		return refreshToken;
	}

	public Claims decodeJwt(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	public boolean isTokenBlacklisted(String token) {
		return redisTemplate.opsForValue().get("blacklist:" + token) == null;
	}

	public boolean validateToken(String token) {
		try {
			Claims claims = decodeJwt(token);
			return claims.getExpiration().after(new Date());
		} catch (JwtException e) {
			return false;
		}
	}

	public String getJwtTokenFromRequestHeader(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(secret)
				.parseClaimsJws(token)
				.getBody();

		return claims.getSubject();
	}

	public Authentication getAuthentication(String token) {
		String username = getUsernameFromToken(token);
		CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	public boolean hasClaim(Claims claims, String claimKey, String claimValue) {
		return claimValue.equals(claims.get(claimKey, String.class));
	}

	public void setHeaderAccessToken(HttpServletResponse response, String accessToken) {
		response.setHeader("authorization", "bearer "+ accessToken);
	}

	public void setHeaderRefreshToken(HttpServletResponse response, String refreshToken) {
		response.setHeader("refreshToken", "bearer "+ refreshToken);
	}

	public long getExpirationTime(String token) {
		Claims claims = decodeJwt(token);
		return claims.getExpiration().getTime();
	}
}
