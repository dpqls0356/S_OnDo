package com.clio.ondo.domain.mission.service;

import static java.time.LocalDateTime.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.model.MissionDetail;
import com.clio.ondo.domain.mission.repository.MissionDetailRepository;
import com.clio.ondo.domain.mission.repository.MissionRepository;

@Service
public class MissionService {

	@Autowired
	private MissionDetailRepository missionDetailRepository;

	@Autowired
	private MissionRepository missionRepository;

	private Random random = new Random();

	//MissionDetail 에서 특별 미션 랜덤3개 추출 후 mission에 저장
	public void createRandomMission(){

		List<MissionDetail> allMissionDetails=missionDetailRepository.findByType("typical"); //특별미션만 추출
		List<MissionDetail> selectedMissionDetails=allMissionDetails.stream()
			.sorted((a,b)->random.nextInt(3)-1)
			.limit(3)
			.toList();

		List<Mission> newMissions=selectedMissionDetails.stream()
			.map(detail->new Mission(
				null,
				false,
				null,
				0,
				detail.getTitle(),
				detail.getContent(),
				detail.getType(),
				detail.getExp(),
				detail.getLevel()
			))
			.toList();

		missionRepository.saveAll(newMissions);
	}

	//MissionDetail 에서 daily 미션을 가져와서 mission에 저장
	public void saveDailyMission(){
		List<MissionDetail> dailyMissionDetail=missionDetailRepository.findByType("daily");
		System.out.println("check) "+dailyMissionDetail);
		List<Mission> dailyMission=dailyMissionDetail.stream()
			.map(detail->new Mission(
				null,
				false,
				null,
				0,
				detail.getTitle(),
				detail.getContent(),
				detail.getType(),
				detail.getExp(),
				detail.getLevel()
			)).toList();

		missionRepository.saveAll(dailyMission);
	}

	//Mission에서 완료하지 않은 특별미션 가져오기
	public List<Mission> getTypicalMission(){
		List<Mission> unCompleteMission = missionRepository.findByCompleteFlag(false);
		List<Mission> typicalMission = unCompleteMission.stream()
			.filter(mission -> "typical".equals(mission.getType()))
			.collect(Collectors.toList());
		return typicalMission;
	}

	//Mission에서 완료하지 않은 데일리미션 가져오기
	public List<Mission> getDailyMission(){
		List<Mission> unCompleteMission = missionRepository.findByCompleteFlag(false);
		List<Mission> dailyMission = unCompleteMission.stream()
			.filter(mission -> "daily".equals(mission.getType()))
			.collect(Collectors.toList());
		return dailyMission;
	}


}
