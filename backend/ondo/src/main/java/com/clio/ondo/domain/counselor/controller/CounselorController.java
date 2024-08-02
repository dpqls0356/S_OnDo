package com.clio.ondo.domain.counselor.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.model.dto.CounselorJoinRequestDto;
import com.clio.ondo.domain.counselor.model.dto.CounselorLoginRequestDto;
import com.clio.ondo.domain.counselor.repository.CounselorRepository;
import com.clio.ondo.domain.counselor.service.CounselorService;
import com.clio.ondo.global.ResponseVO;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;
import com.clio.ondo.global.exception.member.MemberAlreadyExistsException;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/counselor")
@Slf4j
public class CounselorController {

    private final CounselorRepository counselorRepository;
    private final CounselorService counselorService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/join")
    public ResponseEntity<ResponseVO<Void>> join(@RequestBody CounselorJoinRequestDto joinRequestDto) {
        try {
            joinRequestDto.setPassword(passwordEncoder.encode(joinRequestDto.getPassword()));
            Counselor counselor = joinRequestDto.toEntity();
            counselorRepository.save(counselor);
            return ResponseEntity.status(HttpStatus.CREATED).body(ResponseVO.success("Success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseVO.failure("상담사 가입 실패: 올바른 값을 입력해주세요."));
        } catch (MemberAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseVO.failure("상담사 가입 실패: 이미 가입된 회원입니다."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseVO<TokenDto>> login(@RequestBody CounselorLoginRequestDto loginRequestDto, HttpServletResponse response) {
        try {
            TokenDto token = counselorService.login(loginRequestDto);
            jwtTokenProvider.setHeaderAccessToken(response, token.getAccessToken());
            jwtTokenProvider.setHeaderRefreshToken(response, token.getRefreshToken());
            return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("token", token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseVO.failure("로그인 실패"));
        }
    }
}
