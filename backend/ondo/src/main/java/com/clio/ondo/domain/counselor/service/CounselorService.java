package com.clio.ondo.domain.counselor.service;

import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselor.model.Counselor;

@Service
public interface CounselorService {
	Counselor getCounselor(Long id);
}
