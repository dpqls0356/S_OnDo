package com.clio.ondo.domain.counselor.service;

import io.jsonwebtoken.Claims;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.model.QCounselor;
import com.clio.ondo.domain.counselor.model.dto.CounselorResponseDto;
import com.clio.ondo.domain.counselor.repository.CounselorRepository;
import com.clio.ondo.domain.member.model.Gender;
import com.clio.ondo.domain.schedule.model.Schedule;
import com.clio.ondo.domain.schedule.repository.ScheduleRepository;
import java.util.concurrent.TimeUnit;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselor.model.dto.CounselorLoginRequestDto;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

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
    private final JPAQueryFactory queryFactory;
    private final RedisTemplate<String, String> redisTemplate;

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

    //상담사 필터링된 리스트 가져오기
    @Override
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



    @Override
    public Optional<Counselor> getCounselorEntity(Long id) {
        return counselorRepository.findById(id);
    }

    @Override
    @Transactional
    public void logout(String accessToken) throws AuthenticationException {
        Claims accessTokenclaims = jwtTokenProvider.decodeJwt(accessToken);
        if (jwtTokenProvider.validateToken(accessToken)
            && jwtTokenProvider.hasClaim(accessTokenclaims, "type", "access")) {
            String user = accessTokenclaims.getSubject();
            String refreshToken = redisTemplate.opsForValue().get("refresh-token:" + user);
            if (refreshToken != null) {
                redisTemplate.opsForValue().set(
                    "blacklist:" + refreshToken,
                    refreshToken,
                    jwtTokenProvider.getExpirationTime(refreshToken),
                    TimeUnit.MILLISECONDS
                );
            }
            redisTemplate.opsForValue().set(
                "blacklist:" + accessToken,
                accessToken,
                accessTokenclaims.getExpiration().getTime(),
                TimeUnit.MILLISECONDS
            );
        }
    }
}
