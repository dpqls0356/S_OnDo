package com.clio.ondo.domain.member.controller;

import com.clio.ondo.domain.member.model.*;
import com.clio.ondo.domain.member.model.dto.*;
import io.jsonwebtoken.JwtException;
import org.hibernate.sql.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.member.service.MemberService;
import com.clio.ondo.global.auth.CustomUserDetails;
import com.clio.ondo.global.auth.JwtTokenProvider;
import com.clio.ondo.global.auth.TokenDto;
import com.clio.ondo.global.exception.member.MemberAlreadyExistsException;
import com.clio.ondo.global.exception.member.MemberException;
import com.clio.ondo.global.exception.member.MemberNotFoundException;

import jakarta.servlet.http.HttpServletRequest;
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
	public ResponseEntity<ResponseVO<TokenDto>> login(@RequestBody LoginRequestDto loginRequestdto) {
		try {
			TokenDto token = memberService.login(loginRequestdto);
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success(token));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("로그인 실패"));
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<ResponseVO<Void>> logout(HttpServletRequest request) {
		try {
			String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
			memberService.logout(token);
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

	@GetMapping("/me")
	public ResponseEntity<ResponseVO<MemberResponseDto>> getMyInfo(HttpServletRequest request) {
		try {
			String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
			Authentication authentication = jwtTokenProvider.getAuthentication(token);
			CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
			Member user = memberRepository.findByEmail(userDetails.getEmail()).orElseThrow(MemberNotFoundException::new);
			MemberResponseDto memberResponseDto = MemberResponseDto.builder()
					.name(user.getName())
					.nickname(user.getNickname())
					.email(user.getEmail())
					.role(String.valueOf(user.getRole()))
					.profileUrl(user.getProfileUrl())
					.gender(String.valueOf(user.getGender()))
					.birthDate(user.getBirthDate())
					.profileUrl(user.getProfileUrl())
					.build();
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success(memberResponseDto));
		} catch (AuthenticationException | JwtException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseVO.failure("내정보 조회 실패"));
		}
	}

	@PutMapping("/update")
	public ResponseEntity<ResponseVO<String>> update(@RequestBody UpdateRequestDto updateRequestDto, HttpServletRequest request) {
		try {
			updateRequestDto.setPassword(passwordEncoder.encode(updateRequestDto.getPassword()));
			String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
			memberService.updateMember(updateRequestDto, token);
		} catch (MemberNotFoundException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("회원 정보 수정 실패"));
		}
		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("회원 정보 수정 성공"));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<ResponseVO<String>> delete(@RequestBody DeleteRequestDto deleteRequestDto, HttpServletRequest request) {
		try {
			//deleteRequestDto.setPassword(passwordEncoder.encode(deleteRequestDto.getPassword()));
			String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
			memberService.deleteMember(deleteRequestDto, token);
		} catch (MemberNotFoundException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("회원 탈퇴 실패"));
		}
		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("회원 탈퇴 성공"));
	}

	@PostMapping("/reissue")
	public ResponseEntity<ResponseVO<String>> reissueAccessToken(HttpServletRequest request) {
		try {
			String refreshToken = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
			String newAccessToken = memberService.reissueAccessToken(refreshToken);
			return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success(newAccessToken));
		} catch (AuthenticationException | MemberException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("토큰 재발급 실패"));
		}
	}

}
