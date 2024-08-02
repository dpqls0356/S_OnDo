package com.clio.ondo.domain.reservation.service;

import java.util.List;

import com.clio.ondo.domain.reservation.model.Reservation;

public interface MemberReservationService {

	List<Reservation> getReservationList(Long memberId);
}
