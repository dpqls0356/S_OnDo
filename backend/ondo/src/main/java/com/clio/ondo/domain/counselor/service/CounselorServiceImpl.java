package com.clio.ondo.domain.counselor.service;

import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.repository.CounselorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CounselorServiceImpl implements CounselorService {
	private final CounselorRepository counselorRepository;

	@Override
	public Counselor getCounselor(Long id) {
		return counselorRepository.findByCounselorId(id);
	}
}
