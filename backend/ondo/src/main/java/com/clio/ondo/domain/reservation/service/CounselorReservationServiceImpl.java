package com.clio.ondo.domain.reservation.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.reservation.model.Reservation;
import com.clio.ondo.domain.reservation.model.CounselorReservationDto;
import com.clio.ondo.domain.reservation.repository.CounselorReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CounselorReservationServiceImpl implements CounselorReservationService{
	private final CounselorReservationRepository counselorReservationRepository;

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

	@Transactional
	public void addReservation(Reservation newReservation, Long counselorId) {
		// Reservation reservation = counselorReservationRepository.findByCounselor(
		// 	counselorId,
		// 	newReservation.getReservationDate(),
		// 	newReservation.getReservationDate()
		// );
		//
		// if(reservation == null) {
		// 	counselorReservationRepository.save(newReservation);
		// }
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
