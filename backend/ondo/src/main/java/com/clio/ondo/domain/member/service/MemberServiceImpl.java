package com.clio.ondo.domain.member.service;

import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import com.clio.ondo.domain.member.model.JoinRequestDto;
import com.clio.ondo.domain.member.model.LoginRequestDto;
import com.clio.ondo.global.auth.CustomUserDetails;
import com.clio.ondo.global.auth.JwtTokenProvider;
import com.clio.ondo.global.auth.TokenDto;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final RedisTemplate<String, String> redisTemplate;
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationManager authenticationManager;
	@Value("${spring.jwt.access-token-expiration}")
	private long accessTokenExpirationTime;

	@Value("${spring.jwt.refresh-token-expiration}")
	private long refreshTokenExpirationTime;

	@Transactional
	public Long join(JoinRequestDto joinRequestDto) {
		Member member = joinRequestDto.toEntity();
		// 중복 이메일 검증
		Optional<Member> memberOptional = memberRepository.findByEmail(member.getEmail());
		if (memberOptional.isPresent()) {
			throw new IllegalStateException("회원가입에 실패했습니다.");
		}
		memberRepository.save(member);
		return member.getId();
	}

	@Override
	@Transactional
	public void updatePassword(Long memberId, String newPassword) {
		Optional<Member> memberOptional = memberRepository.findById(memberId);
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			member.updatePassword(newPassword);
		} else {
			throw new IllegalStateException("비밀번호 변경이 실패했습니다.");
		}
	}

	@Override
	@Transactional
	public void updateNickname(Long memberId, String newNickname) {
		Optional<Member> memberOptional = memberRepository.findById(memberId);
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			member.updateNickName(newNickname);
		} else {
			throw new IllegalStateException("별명 변경이 실패했습니다.");
		}
	}

	@Override
	public Member findOne(Long memberId) {
		Optional<Member> memberOptional = memberRepository.findById(memberId);
		if (memberOptional.isPresent()) {
			return memberOptional.get();
		} else {
			throw new IllegalStateException("회원 조회가 실패했습니다.");
		}
	}

	@Override
	@Transactional
	public TokenDto login(LoginRequestDto loginRequestDto) {
		Optional<Member> optionalMember = memberRepository.findByEmail(loginRequestDto.getEmail());
		optionalMember.orElseThrow(() -> new IllegalStateException("로그인에 실패했습니다."));
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
				loginRequestDto.getEmail(),
				loginRequestDto.getPassword()
		));
		String accessToken = jwtTokenProvider.generateAccessToken(authentication);
		String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);
		return new TokenDto(accessToken, refreshToken);
	}

	@Override
	public void logout(String accessToken) {
		Claims claims = jwtTokenProvider.decodeJwt(accessToken);
		if (jwtTokenProvider.validateToken(accessToken)
				&& jwtTokenProvider.hasClaim(claims, "type", "access")) {
			String user = claims.getSubject();
			String refreshToken = redisTemplate.opsForValue().get("refresh-token:" + user);
			// 남은 시간으로 다시 작성하기
			if (refreshToken != null) {
				redisTemplate.opsForValue().set(
						"blacklist:" + refreshToken,
						refreshToken,
						refreshTokenExpirationTime,
						TimeUnit.MILLISECONDS
				);
			}
			redisTemplate.opsForValue().set(
					"blacklist:" + accessToken,
					accessToken,
					refreshTokenExpirationTime,
					TimeUnit.MILLISECONDS
			);
		}
	}

	@Override
	public String reissueAccessToken(String refreshToken) {
		Claims claims = jwtTokenProvider.decodeJwt(refreshToken);
		String key = "refresh-token:" + claims.getSubject();
		try {
			if (Objects.equals(redisTemplate.opsForValue().get(key), refreshToken)) {
				String user = claims.getSubject();
				String role = claims.get("role", String.class);
				CustomUserDetails userDetails = new CustomUserDetails(user, role);
				return jwtTokenProvider.generateAccessToken(new UsernamePasswordAuthenticationToken(userDetails, null));
			}
		} catch (IllegalStateException e) {
				throw new IllegalStateException("회원 조회가 실패했습니다.");
		}
        return "유효하지 않은 토큰입니다";
    }
}
