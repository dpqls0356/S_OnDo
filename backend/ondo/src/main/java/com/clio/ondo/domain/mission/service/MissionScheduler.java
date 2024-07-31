package com.clio.ondo.domain.mission.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.clio.ondo.global.auth.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class MissionScheduler {

	@Autowired
	MissionService missionService;

	Long memberId=21L;

	@Scheduled(cron="0 0 6 1/1 * *") //매일 오전 6시에 실행
	public void missionSchedule(){
		missionService.putCompleteMission(memberId); //어제의 미션 정리
		missionService.UpdateTodayMission(memberId); //오늘의 미션 업데이트
	}

}
