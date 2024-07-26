package com.clio.ondo.global.auth;

import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

	private final RedisTemplate<String, String> redisTemplate;
	private final UserDetailsService userDetailsService;

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
		Claims claims = Jwts.claims().setSubject(authentication.getName());
		Date now = new Date();
		Date expireDate = new Date(now.getTime() + accessTokenExpirationTime);

		return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(expireDate)
			.signWith(SignatureAlgorithm.HS512, secret)
			.compact();
	}

	public String generateRefreshToken(Authentication authentication) {
		Claims claims = Jwts.claims().setSubject(authentication.getName());
		Date now = new Date();
		Date expireDate = new Date(now.getTime() + refreshTokenExpirationTime);

		String refreshToken = Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(expireDate)
			.signWith(SignatureAlgorithm.HS512, secret)
			.compact();

		redisTemplate.opsForValue().set(
			authentication.getName(),
			refreshToken,
			refreshTokenExpirationTime,
			TimeUnit.MILLISECONDS
		);
		return refreshToken;
	}

	public boolean validateToken(String token){
		try{
			Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
			return true;
		} catch(ExpiredJwtException e) {
			log.error("Expired JWT token");
			return false;
		} catch(JwtException e) {
			log.error("Invalid JWT token");
			return false;
		}
	}

}
