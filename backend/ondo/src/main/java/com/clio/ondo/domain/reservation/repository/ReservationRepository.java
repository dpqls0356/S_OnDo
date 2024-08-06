package com.clio.ondo.domain.reservation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clio.ondo.domain.reservation.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	List<Reservation> findByMemberId(Long memberId);
	List<Reservation> findByCounselorId(Long counselorId);

	List<Reservation> findByMemberIdAndCounselorIdOrderByReservationDateDesc(Long memberId, Long counselorId);

	Optional<Reservation> findById(Long id);
}
