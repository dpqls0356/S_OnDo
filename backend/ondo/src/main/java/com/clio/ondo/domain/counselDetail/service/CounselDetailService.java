package com.clio.ondo.domain.counselDetail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.counselDetail.model.CounselDetail;
import com.clio.ondo.domain.counselDetail.model.MemberWithReservationDto;
import com.clio.ondo.domain.counselDetail.model.ReservationWithDetailDto;

@Service
public interface CounselDetailService {
	void save(CounselDetail counselDetail);

	MemberWithReservationDto getRerservationWithDetail(Long memberId, Long counselorId);

	@Transactional
	MemberWithReservationDto updateReservationCounselingDetail(Long counselorId,
		ReservationWithDetailDto reservationWithDetailDto);
}
