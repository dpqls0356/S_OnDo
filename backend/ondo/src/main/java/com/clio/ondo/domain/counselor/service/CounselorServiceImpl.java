package com.clio.ondo.domain.counselor.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.model.dto.CounselorResponseDto;
import com.clio.ondo.domain.counselor.repository.CounselorRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CounselorServiceImpl implements CounselorService{

	private final CounselorRepository counselorRepository;

	//상담사 전체 리스트 가져오기
	@Override
	public List<CounselorResponseDto> getCounselorList(){
		List<Counselor> counselors=counselorRepository.findAll();
		List<CounselorResponseDto> counselorList=new ArrayList<>();

		for(Counselor c:counselors){
			CounselorResponseDto dto=new CounselorResponseDto();
			dto.setId(c.getId());
			dto.setName(c.getName());
			dto.setField(c.getField());
			dto.setGender(c.getGender());
			dto.setSelfIntroduction(c.getSelfIntroduction());
			dto.setProfileUrl(c.getProfileUrl());

			counselorList.add(dto);
		}

		return counselorList;
	}


	//상담사 상세보기
	public CounselorResponseDto getCounselor(Long counselorId){

		Optional<Counselor> counselor=counselorRepository.findById(counselorId);
		if(counselor.isPresent()){
			CounselorResponseDto counselorDto=new CounselorResponseDto();
			Counselor c=counselor.get();
			counselorDto.setId(c.getId());
			counselorDto.setName(c.getName());
			counselorDto.setField(c.getField());
			counselorDto.setGender(c.getGender());
			counselorDto.setSelfIntroduction(c.getSelfIntroduction());
			counselorDto.setProfileUrl(c.getProfileUrl());

			return counselorDto;
		}else{
			return null;
		}
	}


}
