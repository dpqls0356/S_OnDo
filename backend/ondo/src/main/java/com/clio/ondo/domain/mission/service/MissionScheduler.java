package com.clio.ondo.domain.mission.service;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MissionScheduler {

	MissionService missionService;
	Long memberId=0L;

	// 생성자 주입을 통해 MissionService 의존성 주입
	public MissionScheduler(MissionService missionService) {
		this.missionService = missionService;
	}

	@Scheduled(cron="0 0 6 1/1 * *") //매일 오전 6시에 실행
	public void missionSchedule(){
		missionService.putCompleteMission(memberId);
		missionService.UpdateTodayMission(memberId);
	}


}
