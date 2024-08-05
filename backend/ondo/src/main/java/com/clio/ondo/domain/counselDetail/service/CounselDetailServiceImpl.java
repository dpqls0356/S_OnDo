package com.clio.ondo.domain.counselDetail.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselDetail.model.CounselDetail;
import com.clio.ondo.domain.counselDetail.model.MemberWithReservationDto;
import com.clio.ondo.domain.counselDetail.model.ReservationWithDetailDto;
import com.clio.ondo.domain.counselDetail.repository.CounselDetailRepository;
import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.reservation.model.Reservation;
import com.clio.ondo.domain.reservation.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CounselDetailServiceImpl implements CounselDetailService {
	private final CounselDetailRepository counselDetailRepository;
	private final ReservationRepository reservationRepository;
	private final MemberRepository memberRepository;

	@Override
	public void save(CounselDetail counselDetail){
		counselDetailRepository.save(counselDetail);
	}

	@Override
	public MemberWithReservationDto getRerservationWithDetail(Long memberId){
		Member member = memberRepository.findById(memberId).orElse(null);
		List<Reservation> reservations = reservationRepository.findByMemberId(memberId);
		List<ReservationWithDetailDto> reservationWithDetailDtos = new ArrayList<>();
		for(Reservation reservation : reservations){
			CounselDetail counselDetail = counselDetailRepository.findCOunselDetailById(reservation.getId());
			ReservationWithDetailDto reservationWithDetailDto = ReservationWithDetailDto.builder()
				.reservationId(reservation.getId())
				.reservationDate(reservation.getReservationDate())
				.counselingReservationDetail(reservation.getDetail())
				.counsellingDetail(counselDetail.getContent())
				.build();

			reservationWithDetailDtos.add(reservationWithDetailDto);
		}

		MemberWithReservationDto memberWIthReservationto = MemberWithReservationDto.builder()
			.memberId(member.getId())
			.memberName(member.getName())
			.birthDate(member.getBirthDate())
			.gender(member.getGender())
			.reservations(reservationWithDetailDtos)
			.build();

		return memberWIthReservationto;
	}
}
