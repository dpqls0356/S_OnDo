package com.clio.ondo.domain.counselor.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.model.dto.CounselorResponseDto;
import com.clio.ondo.domain.counselor.service.CounselorService;
import com.clio.ondo.domain.reservation.model.dto.ReservationResponseDto;
import com.clio.ondo.global.ResponseVO;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/counselor")
@Slf4j
public class CounselorController {

	private final CounselorService counselorService;
	private final JwtTokenProvider jwtTokenProvider;

	//상담사 전체 리스트 가져오기
	@GetMapping("/list")
	public ResponseEntity<ResponseVO<List<CounselorResponseDto>>> getCounselorList(){
		List<CounselorResponseDto> counselorList=counselorService.getCounselorList();
		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("counselorList", counselorList));
	}

	//상담사 상세보기
	@GetMapping("/list/{counselorId}")
	public ResponseEntity<ResponseVO<CounselorResponseDto>> getCounselor(@PathVariable Long counselorId){
		CounselorResponseDto counselor=counselorService.getCounselor(counselorId);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("counselor", counselor));
	}


	
}
