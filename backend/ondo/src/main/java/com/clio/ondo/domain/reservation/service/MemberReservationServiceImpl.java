package com.clio.ondo.domain.reservation.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.reservation.model.Reservation;
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

	//예약 내역 가져오기
	@Override
	public List<Reservation> getReservationList(Long memberId){
		List<Reservation> myList=reservationRepository.findByMemberId(memberId);
		return myList;
	}

}
