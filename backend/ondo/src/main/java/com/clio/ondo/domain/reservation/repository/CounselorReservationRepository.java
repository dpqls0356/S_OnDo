package com.clio.ondo.domain.reservation.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.reservation.model.Reservation;

public interface CounselorReservationRepository extends JpaRepository<Reservation, Long> {
	@Query("select r from Reservation r where r.counselor.id = :counselorId and r.member is not null and r.reservationDate between :from and :to")
	List<Reservation> findByDate(@Param("counselorId") Long counselorId, @Param("from") LocalDateTime from, @Param("to") LocalDateTime to);
	@Query("select r from Reservation r where r.counselor.id = :counselorId and r.member is null and r.reservationDate between :from and :to")
	List<Reservation> findByDateAndId(@Param("counselorId") Long counselorId, @Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

	@Transactional
	void deleteByCounselorIdAndReservationDate(Long conselorId, LocalDateTime from, LocalDateTime to);
}
