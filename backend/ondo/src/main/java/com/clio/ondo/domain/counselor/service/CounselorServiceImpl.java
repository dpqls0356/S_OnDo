package com.clio.ondo.domain.counselor.service;

import com.clio.ondo.domain.counselor.model.Counselor;
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
}
