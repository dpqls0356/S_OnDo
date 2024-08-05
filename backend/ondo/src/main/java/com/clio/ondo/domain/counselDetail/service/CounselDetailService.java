package com.clio.ondo.domain.counselDetail.service;

import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselDetail.model.CounselDetail;
import com.clio.ondo.domain.counselDetail.model.MemberWithReservationDto;

@Service
public interface CounselDetailService {
	void save(CounselDetail counselDetail);

	MemberWithReservationDto getRerservationWithDetail(Long memberId);
}
