package com.clio.ondo.domain.member.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.model.dto.DeleteRequestDto;
import com.clio.ondo.domain.member.model.dto.JoinRequestDto;
import com.clio.ondo.domain.member.model.dto.LoginRequestDto;
import com.clio.ondo.domain.member.model.dto.MemberResponseDto;
import com.clio.ondo.domain.member.model.dto.UpdateRequestDto;
import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.member.service.MemberService;
import com.clio.ondo.domain.reservation.model.Reservation;
import com.clio.ondo.global.ResponseVO;
import com.clio.ondo.global.auth.OAuth.PrincipalDetails;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;
import com.clio.ondo.global.exception.member.MemberAlreadyExistsException;
import com.clio.ondo.global.exception.member.MemberException;
import com.clio.ondo.global.exception.member.MemberNotFoundException;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
@Slf4j
public class MemberController {

	private final MemberRepository memberRepository;
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	@PostMapping("/login")
	public ResponseEntity<ResponseVO<TokenDto>> login(@RequestBody LoginRequestDto loginRequestdto, HttpServletResponse response) {
		try {
			TokenDto token = memberService.login(loginRequestdto);
			log.error(token.getAccessToken());
			log.error(token.getRefreshToken());
			// 쿠키 설정
			Cookie accessTokenCookie = new Cookie("accessToken", token.getAccessToken());
			accessTokenCookie.setHttpOnly(true);
			accessTokenCookie.setPath("/");
			accessTokenCookie.setMaxAge(3600); // 1 hour

			Cookie refreshTokenCookie = new Cookie("refreshToken", token.getRefreshToken());
			refreshTokenCookie.setHttpOnly(true);
			refreshTokenCookie.setPath("/");
			refreshTokenCookie.setMaxAge(7 * 24 * 3600); // 1 week

			response.addCookie(accessTokenCookie);
			response.addCookie(refreshTokenCookie);
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("token", token));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("로그인 실패"));
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<ResponseVO<Void>> logout(HttpServletRequest request) {
		try {
			String token = jwtTokenProvider.getJwtTokenFromCookies(request, "accessToken");
			memberService.logout(token);

			Cookie accessTokenCookie = new Cookie("accessToken", null);
			accessTokenCookie.setHttpOnly(true);
			accessTokenCookie.setPath("/");
			accessTokenCookie.setMaxAge(0);

			Cookie refreshTokenCookie = new Cookie("refreshToken", null);
			refreshTokenCookie.setHttpOnly(true);
			refreshTokenCookie.setPath("/");
			refreshTokenCookie.setMaxAge(0);

			HttpServletResponse response = (HttpServletResponse) request;
			response.addCookie(accessTokenCookie);
			response.addCookie(refreshTokenCookie);
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("logout"));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseVO.failure("로그아웃 실패"));
		}
	}

	@PostMapping("/join")
	public ResponseEntity<ResponseVO<Void>> join(@RequestBody JoinRequestDto joinRequestDto) {
		try {
			joinRequestDto.setPassword(passwordEncoder.encode(joinRequestDto.getPassword()));
			memberService.join(joinRequestDto);
			return ResponseEntity.status(HttpStatus.CREATED).body(ResponseVO.success("Success"));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseVO.failure("회원 가입 실패: 올바른 값을 입력해주세요."));
		} catch (MemberAlreadyExistsException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseVO.failure("회원 가입 실패: 이미 가입된 회원입니다."));
		}
	}

	@GetMapping("/id")
	public ResponseEntity<ResponseVO<Long>> getMyId(HttpServletRequest request) {
		String token = jwtTokenProvider.getJwtTokenFromCookies(request, "accessToken");
		Long id = jwtTokenProvider.getIdFromToken(token);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("id", id));
	}

	@GetMapping("/me")
	public ResponseEntity<ResponseVO<MemberResponseDto>> getMyInfo(HttpServletRequest request) {
		try {
			String token = jwtTokenProvider.getJwtTokenFromCookies(request, "accessToken");
			Authentication authentication = jwtTokenProvider.getAuthentication(token);
			PrincipalDetails userDetails = (PrincipalDetails)authentication.getPrincipal();
			Member user = memberRepository.findByEmail(userDetails.getMember().getEmail())
				.orElseThrow(MemberNotFoundException::new);
			MemberResponseDto memberResponseDto = MemberResponseDto.builder()
				.id(user.getId())
				.name(user.getName())
				.nickname(user.getNickname())
				.email(user.getEmail())
				.role(String.valueOf(user.getRole()))
				.profileUrl(user.getProfileUrl())
				.gender(String.valueOf(user.getGender()))
				.birthDate(user.getBirthDate())
				.profileUrl(user.getProfileUrl())
				.build();
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("user", memberResponseDto));
		} catch (AuthenticationException | JwtException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseVO.failure("내정보 조회 실패"));
		}
	}

	@PutMapping("/update")
	public ResponseEntity<ResponseVO<String>> update(@RequestBody UpdateRequestDto updateRequestDto,
		HttpServletRequest request) {
		try {
			String token = jwtTokenProvider.getJwtTokenFromCookies(request, "accessToken");
			memberService.updateMember(updateRequestDto, token);
		} catch (MemberNotFoundException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("회원 정보 수정 실패"));
		}
		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("회원 정보 수정 성공"));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<ResponseVO<String>> delete(@RequestBody DeleteRequestDto deleteRequestDto,
		HttpServletRequest request) {
		try {
			String token = jwtTokenProvider.getJwtTokenFromCookies(request, "accessToken");
			memberService.deleteMember(deleteRequestDto, token);
		} catch (MemberNotFoundException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("회원 탈퇴 실패"));
		}
		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("회원 탈퇴 성공"));
	}

	@PostMapping("/reissue")
	public ResponseEntity<ResponseVO<String>> reissueAccessToken(HttpServletRequest request) {
		try {
			String refreshToken = jwtTokenProvider.getJwtTokenFromCookies(request, "refreshToken");
			String newAccessToken = memberService.reissueAccessToken(refreshToken);
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success(newAccessToken));
		} catch (AuthenticationException | MemberException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("토큰 재발급 실패"));
		}
	}

	@GetMapping("/oauth-success")
	public ResponseEntity<ResponseVO<TokenDto>> oauthSuccess(TokenDto token) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("token", token));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("로그인 실패"));
		}
	}

	@GetMapping("/reservations")
	public ResponseEntity<ResponseVO<List<Reservation>>> getReservations(HttpServletRequest request) {
		try {
			String token = jwtTokenProvider.getJwtTokenFromCookies(request, "accessToken");
			Long id = jwtTokenProvider.getIdFromToken(token);
			List<Reservation> reservations = memberService.getReservationsForMember(id);
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("reservations", reservations));
		} catch (AuthenticationException | MemberException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("예약 목록 불러오기 실패"));
		}
	}
}
