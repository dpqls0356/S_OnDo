package com.clio.ondo.domain.mission.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MissionScheduler {

	MissionService missionService;
	Long memberId=21L;

	// 생성자 주입을 통해 MissionService 의존성 주입
	public MissionScheduler(MissionService missionService) {
		this.missionService = missionService;
	}

	@Scheduled(cron="0 0 6 1/1 * *") //매일 오전 6시에 실행
	public void missionSchedule(){
		missionService.putCompleteMission(memberId); //어제의 미션 정리
		missionService.UpdateTodayMission(memberId); //오늘의 미션 업데이트
	}

}
