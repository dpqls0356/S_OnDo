package com.clio.ondo.domain.counselor.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.model.dto.CounselorResponseDto;
import com.clio.ondo.domain.counselor.repository.CounselorRepository;
import com.clio.ondo.domain.schedule.model.Schedule;
import com.clio.ondo.domain.schedule.repository.ScheduleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselor.model.dto.CounselorLoginRequestDto;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class CounselorServiceImpl implements CounselorService {

    private final JwtTokenProvider jwtTokenProvider;
    private final DaoAuthenticationProvider counselorAuthenticationProvider;
    private final CounselorRepository counselorRepository;
    private final ScheduleRepository scheduleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public TokenDto login(CounselorLoginRequestDto loginRequestDto) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(loginRequestDto.getId(), loginRequestDto.getPassword());

        Authentication authentication = counselorAuthenticationProvider.authenticate(authToken);

        String accessToken = jwtTokenProvider.generateCounselorAccessToken(authentication);
        String refreshToken = jwtTokenProvider.generateCounselorRefreshToken(authentication);

        return new TokenDto(accessToken, refreshToken);
    }

    @Override
    @Transactional
    public void join(Counselor counselor) {
        if (counselor.getSchedule() == null) {
            counselor.setSchedule(new Schedule(counselor));
            scheduleRepository.save(counselor.getSchedule());
        }
        counselorRepository.save(counselor);
    }


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
    @Override
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
