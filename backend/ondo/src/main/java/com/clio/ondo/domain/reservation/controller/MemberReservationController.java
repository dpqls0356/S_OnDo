package com.clio.ondo.domain.reservation.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.reservation.model.Reservation;
import com.clio.ondo.domain.reservation.model.dto.ReservationResponseDto;
import com.clio.ondo.domain.reservation.service.MemberReservationService;
import com.clio.ondo.global.ResponseVO;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member/reservation")
@Slf4j
public class MemberReservationController {

	private final MemberReservationService memberReservationService;
	private final JwtTokenProvider jwtTokenProvider;

	//자신의 예약 내역 가져오기
	@GetMapping("/getReservation")
	public ResponseEntity<ResponseVO<List<ReservationResponseDto>>> getTodayTypical(HttpServletRequest request){
		String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
		Long memberId = jwtTokenProvider.getIdFromToken(token);

		List<Reservation> myList=memberReservationService.getReservationList(memberId);
		List<ReservationResponseDto> reservationList=new ArrayList<>();

		for (Reservation reservation : myList) {
			ReservationResponseDto dto = new ReservationResponseDto();
			dto.setCounselDetailId(reservation.getId()); // CounselDetail의 id는 Reservation의 id와 동일
			dto.setId(reservation.getId());
			dto.setMemberId(memberId);
			dto.setReservationDate(reservation.getReservationDate());
			dto.setDetail(reservation.getDetail());
			dto.setCounselingUrl(reservation.getCounselingUrl());

			// Reservation 엔티티에서 Counselor 객체를 가져와서 counselorId 추출
			Counselor counselor = reservation.getCounselor();
			if (counselor != null) {
				dto.setCounselorId(counselor.getId()); // Counselor 객체에서 ID를 추출하여 설정
			}

			reservationList.add(dto);
		}

		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("reservationList", reservationList));
	}

	//자신의 예약 내역 취소하기
	@DeleteMapping("/cancel/{reservationId}")
	public ResponseEntity<ResponseVO<Void>> cancelReservation(@PathVariable Long reservationId){
		memberReservationService.cancelReservation(reservationId);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("에약 삭제 완료"));
	}


}
