package com.clio.ondo.domain.counselDetail.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public MemberWithReservationDto getRerservationWithDetail(Long memberId, Long counselorId){
		Member member = memberRepository.findById(memberId).orElse(null);
		List<Reservation> reservations = reservationRepository.findByMemberIdAndCounselorIdOrderByReservationDateDesc(memberId, counselorId);
		List<ReservationWithDetailDto> reservationWithDetailDtos = new ArrayList<>();
		for(Reservation reservation : reservations){
			CounselDetail counselDetail = counselDetailRepository.findCounselDetailById(reservation.getId());
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

	@Override
	@Transactional
	public MemberWithReservationDto updateReservationCounselingDetail(Long counselorId,
		ReservationWithDetailDto reservationWithDetailDto){
		Reservation reservation = reservationRepository.findById(reservationWithDetailDto.getReservationId()).orElse(null);
		CounselDetail counselDetail = counselDetailRepository.findCounselDetailById(reservation.getId());
		counselDetail.updateContent(reservationWithDetailDto.getCounsellingDetail());

		Long memberId = reservation.getMember().getId();

		return getRerservationWithDetail(memberId, counselorId);
	}
}
