package com.clio.ondo.domain.member.controller;

import com.clio.ondo.domain.member.model.LoginRequestDto;
import com.clio.ondo.domain.member.model.JoinRequestDto;
import com.clio.ondo.global.auth.JwtTokenProvider;
import com.clio.ondo.global.auth.TokenDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
@Slf4j
public class MemberController {

	private final MemberRepository memberRepository;
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody JoinRequestDto joinRequestDto) {
		joinRequestDto.setPassword(passwordEncoder.encode(joinRequestDto.getPassword()));
		memberService.join(joinRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestdto) {
		TokenDto token = memberService.login(loginRequestdto);
		return ResponseEntity.status(HttpStatus.OK).body(token);
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request) {
		String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
		memberService.logout(token);
		return ResponseEntity.status(HttpStatus.OK).body("logout");
	}

	// accessToken 재발급
	@PostMapping("/reissue")
	public ResponseEntity<?> reissueAccessToken(HttpServletRequest request) {
		String refreshToken = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
		String newAccessToken = memberService.reissueAccessToken(refreshToken);
		return ResponseEntity.status(HttpStatus.OK).body(newAccessToken);
	}


	@GetMapping("/test")
	public ResponseEntity<?> test() {
		return ResponseEntity.status(HttpStatus.OK).body("Testsetstsets");
	}

	// @GetMapping("/내정보불러오기")
	// public ResponseEntity<?> getCurrentUser() {
	// 	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	// 	UserDetails userDetails = (UserDetails) authentication.getPrincipal();
	// 	return ResponseEntity.ok(userDetails);
	// }


}
