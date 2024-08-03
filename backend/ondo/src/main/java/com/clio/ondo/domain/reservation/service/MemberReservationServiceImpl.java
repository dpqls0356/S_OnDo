package com.clio.ondo.domain.reservation.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.reservation.model.Reservation;
import com.clio.ondo.domain.reservation.model.dto.ReservationResponseDto;
import com.clio.ondo.domain.reservation.model.dto.ScheduleResponseDto;
import com.clio.ondo.domain.reservation.repository.ReservationRepository;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberReservationServiceImpl implements MemberReservationService{

	private final ReservationRepository reservationRepository;
	private final JwtTokenProvider jwtTokenProvider;

	//나의 예약 내역 가져오기
	@Override
	public List<ReservationResponseDto> getReservationList(Long memberId){
		List<Reservation> myList=reservationRepository.findByMemberId(memberId);
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

		return reservationList;
	}

	//예약 내역 삭제하기
	@Override
	@Transactional
	public void cancelReservation(Long reservationId){
		reservationRepository.deleteById(reservationId);
	}

	//해당 상담사의 예약 내역 가져오기
	// public List<ReservationResponseDto> getCounselorSchedule(Long counselorId){
	// 	List<Reservation> reservationList=reservationRepository.findByCounselorId(counselorId);
	// 	List<ReservationResponseDto> scheduleList=new ArrayList<>();
	//
	// 	for (Reservation reservation : reservationList) {
	// 		ReservationResponseDto dto = new ReservationResponseDto();
	// 		dto.setCounselDetailId(reservation.getId()); // CounselDetail의 id는 Reservation의 id와 동일
	// 		dto.setId(reservation.getId());
	// 		dto.setReservationDate(reservation.getReservationDate());
	// 		dto.setDetail(reservation.getDetail());
	// 		dto.setCounselingUrl(reservation.getCounselingUrl());
	//
	// 		// Reservation 엔티티에서 Counselor 객체를 가져와서 counselorId 추출
	// 		Counselor counselor = reservation.getCounselor();
	// 		if (counselor != null) {
	// 			dto.setCounselorId(counselor.getId()); // Counselor 객체에서 ID를 추출하여 설정
	// 		}
	// 		// Reservation 엔티티에서 Member 객체를 가져와서 memberId 추출
	// 		Member member = reservation.getMember();
	// 		if(member!=null){
	// 			dto.setMemberId(member.getId());
	// 		}
	//
	// 		scheduleList.add(dto);
	// 	}
	//
	// 	return scheduleList;
	//
	// }

	//해당 상담사의 예약 내역 가져오기
	@Override
	public List<ScheduleResponseDto> getCounselorSchedule(Long counselorId){
		List<Reservation> reservationList=reservationRepository.findByCounselorId(counselorId);
		List<ScheduleResponseDto> scheduleList=new ArrayList<>();

		for(Reservation reservation:reservationList){
			LocalDateTime time=reservation.getReservationDate();
			ScheduleResponseDto dto=new ScheduleResponseDto();

			dto.setCounselorId(counselorId);
			dto.setYear(time.getYear());
			dto.setMonth(time.getMonthValue());
			dto.setDay(time.getDayOfMonth());
			dto.setHour(time.getHour());
			dto.setMinute(time.getMinute());

			scheduleList.add(dto);
		}

		return scheduleList;
	}

}
