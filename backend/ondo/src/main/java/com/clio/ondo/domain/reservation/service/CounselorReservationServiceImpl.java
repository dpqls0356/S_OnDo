package com.clio.ondo.domain.reservation.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.service.CounselorService;
import com.clio.ondo.domain.reservation.model.CounselorReservationAddDto;
import com.clio.ondo.domain.reservation.model.Reservation;
import com.clio.ondo.domain.reservation.model.CounselorReservationDto;
import com.clio.ondo.domain.reservation.repository.CounselorReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CounselorReservationServiceImpl implements CounselorReservationService{
	private final CounselorReservationRepository counselorReservationRepository;
	private final CounselorService counselorService;

	// 해당 날짜의 예약 기록을 모두 가져오되 Member가 null인 경우를 제한다.
	@Override
	public List<CounselorReservationDto> getReservationByDate(Long counselorId, String dateStr) {
		LocalDateTime from = convertStartDate(dateStr);
		LocalDateTime to = convertEndDate(dateStr);

		List<Reservation> reservations = counselorReservationRepository.findByDate(counselorId, from, to);
		List<CounselorReservationDto> counselorReservationDtos = new ArrayList<>();
		for(Reservation reservation : reservations) {
			counselorReservationDtos.add(
				CounselorReservationDto.builder()
					.reservationId(reservation.getId())
					.reservationDate(reservation.getReservationDate())
					.memberId(reservation.getMember().getId())
					.memberName(reservation.getMember().getName())
					.memberBirthday(reservation.getMember().getBirthDate())
					.counselingUrl(reservation.getCounselingUrl())
					.build()
			);
		}

		return counselorReservationDtos;
	}

	// Setter가 좀 아니긴 한데 일단 그냥 하자...
	@Override
	@Transactional
	public void addReservation(CounselorReservationAddDto counselorReservationAddDto) {
		Reservation reservation = new Reservation();
		reservation.setId(null);
		reservation.setReservationDate(counselorReservationAddDto.getReservationDate());
		reservation.setDetail(null);
		reservation.setMember(null);
		// counselorId로 서비스에서 가져와야겠네..
		reservation.setCounselor(counselorService.getCounselor(counselorReservationAddDto.getCounselorId()));
		reservation.setCounselingUrl(null);
		reservation.setCounselingDetail(null);

		counselorReservationRepository.save(reservation);
	}

	@Override
	@Transactional
	public void deleteReservation(Long reservationId) {
		counselorReservationRepository.deleteById(reservationId);
	}


	@Override
	public LocalDateTime convertStartDate(String dateStr) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		LocalDate date = LocalDate.parse(dateStr, formatter);
		return date.atStartOfDay();
	}

	@Override
	public LocalDateTime convertEndDate(String dateStr) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		LocalDate date = LocalDate.parse(dateStr, formatter);
		LocalTime endOfDay = LocalTime.of(23, 59, 59);
		return date.atTime(endOfDay);
	}
}
