package com.clio.ondo.domain.mission.service;

import static java.time.LocalDateTime.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.model.MissionDetail;
import com.clio.ondo.domain.mission.model.TodayMission;
import com.clio.ondo.domain.mission.repository.CompleteMissionRepository;
import com.clio.ondo.domain.mission.repository.MissionDetailRepository;
import com.clio.ondo.domain.mission.repository.MissionRepository;
import com.clio.ondo.domain.mission.repository.TodayMissionRepository;

@Service
public class MissionService {

	@Autowired
	private MissionDetailRepository missionDetailRepository;

	@Autowired
	private TodayMissionRepository todayMissionRepository;

	@Autowired
	private CompleteMissionRepository completeMissionRepository;

	private Random random = new Random();

	//MissionDetail에서 특별미션 랜덤 3개 추출
	public List<MissionDetail> createRandomMission(){
		List<MissionDetail> allMissionDetails=missionDetailRepository.findByType("typical"); //특별미션만 추출
		List<MissionDetail> selectedMissionDetails=allMissionDetails.stream()
			.sorted((a,b)->random.nextInt(3)-1)
			.limit(3)
			.toList();
		return selectedMissionDetails;
	}


	//오늘의 특별+데일리 미션 todayMission에 저장
	public void TodayMission(Long memberId){

		//특별 미션 랜덤 3개 추출
		List<MissionDetail> typicalMissions=createRandomMission(); //랜덤 특별미션 3개
		List<MissionDetail> dailyMissions=missionDetailRepository.findByType("daily"); //데일리 미션

		List<MissionDetail> allMissions = new ArrayList<>();
		allMissions.addAll(typicalMissions);
		allMissions.addAll(dailyMissions);

		List<Mission> randMissions=allMissions.stream()
			.map(detail->new Mission(
				false,
				null, //now()
				detail.getTitle(),
				detail.getContent(),
				detail.getType(),
				detail.getExp(),
				detail.getLevel()
			))
			.toList();

		// 해당 memberId로 TodayMission이 있는지 확인
		TodayMission existingTodayMission = todayMissionRepository.findByMemberId(memberId);

		if (existingTodayMission != null) {
			// 기존 TodayMission이 있는 경우, missions 추가
			existingTodayMission.getMissions().addAll(randMissions);
			todayMissionRepository.save(existingTodayMission);
		} else {
			// 새로운 TodayMission 생성
			TodayMission newTodayMission = TodayMission.builder()
				.id(null)
				.memberId(memberId)
				.missions(randMissions)
				.build();

			todayMissionRepository.save(newTodayMission);
		}
	}


}
