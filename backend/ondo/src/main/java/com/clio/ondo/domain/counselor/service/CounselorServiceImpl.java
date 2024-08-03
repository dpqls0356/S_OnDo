package com.clio.ondo.domain.counselor.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.model.QCounselor;
import com.clio.ondo.domain.counselor.model.dto.CounselorResponseDto;
import com.clio.ondo.domain.counselor.repository.CounselorRepository;
import com.clio.ondo.domain.member.model.Gender;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CounselorServiceImpl implements CounselorService{

	private final CounselorRepository counselorRepository;
	private final JPAQueryFactory queryFactory;

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

	//상담사 필터링된 리스트 가져오기
	public List<CounselorResponseDto> filteredList(String name, Gender gender,String field){
		QCounselor counselor = QCounselor.counselor;
		BooleanBuilder builder=new BooleanBuilder();
		if(gender!=null){
			builder.and(counselor.gender.eq(gender));
		}
		if(field!=null){
			builder.and(counselor.field.eq(field));
		}
		if(name!=null){
			builder.and(counselor.name.eq(name));
		}

		return queryFactory.select(Projections.constructor(CounselorResponseDto.class,
				counselor.id,
				counselor.name,
				counselor.gender,
				counselor.field,
				counselor.selfIntroduction,
				counselor.profileUrl))
			.from(counselor)
			.where(builder)
			.fetch();
	}


}
