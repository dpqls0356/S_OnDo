package com.clio.ondo.domain.mission.service;

import static java.time.LocalDateTime.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.mission.model.CompleteMission;
import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.model.MissionDetail;
import com.clio.ondo.domain.mission.model.TodayMission;
import com.clio.ondo.domain.mission.repository.CompleteMissionRepository;
import com.clio.ondo.domain.mission.repository.MissionDetailRepository;
import com.clio.ondo.domain.mission.repository.TodayMissionRepository;

@Service
public class MissionService {

	@Autowired
	private MissionDetailRepository missionDetailRepository;

	@Autowired
	private TodayMissionRepository todayMissionRepository;

	@Autowired
	private CompleteMissionRepository completeMissionRepository;

	@Autowired
	private MemberRepository memberRepository;

	private Random random = new Random();

	//스케줄링 된 메서드
	//--------------------------------------------------------------------
	//모든 멤버별 미션 업데이트
	public void updateMission(){
		List<Member> members=memberRepository.findAll();
		for(Member member:members){
			Long memberId=member.getId();
			putCompleteMission(memberId);
			createTodayMission(memberId);
		}
	}

	//완료한 특별미션 completeMission에 넣기
	//완료하지 않은 특별 미션 + 데일리 미션 삭제
	public void putCompleteMission(Long memberId){

		TodayMission todayMission=todayMissionRepository.findByMemberId(memberId);
		List<Mission> missionList=todayMission.getMissions(); //현재 멤버의 오늘의 미션
		List<Mission> completeList=new ArrayList<>(); //완료한 특별미션

		for(Mission mission : missionList){
			if(mission.isCompleteFlag() && mission.getType().equals("typical")){ //완료한 특별 미션이라면
				completeList.add(mission);
			}
		}

		//completeMission에 삽입
		// 해당 memberId로 completeMission이 있는지 확인
		CompleteMission existingCompleteMission = completeMissionRepository.findByMemberId(memberId);

		if (existingCompleteMission != null) {
			// 기존 completeMission이 있는 경우, missions에 추가
			existingCompleteMission.getMissions().addAll(completeList);
			completeMissionRepository.save(existingCompleteMission);
		} else {
			// 새로운 completeMission이 생성
			CompleteMission newCompleteMission = CompleteMission.builder()
				.id(null)
				.memberId(memberId)
				.missions(completeList)
				.build();

			completeMissionRepository.save(newCompleteMission);
		}

		//그 외의 미션 todayMission에서 삭제
		todayMission.getMissions().clear();

		//todayMission에 저장
		todayMissionRepository.save(todayMission);

	}

	//MissionDetail에서 특별미션 랜덤 3개 추출
	public List<MissionDetail> createRandomMission() {
		List<MissionDetail> allMissionDetails = missionDetailRepository.findByType("typical"); //특별미션만 추출
		List<MissionDetail> selectedMissionDetails = allMissionDetails.stream()
			.sorted((a, b) -> random.nextInt(3) - 1)
			.limit(3)
			.toList();
		return selectedMissionDetails;
	}

	//오늘의 특별+데일리 미션 todayMission에 저장
	public void createTodayMission(Long memberId) {

		//특별 미션 랜덤 3개 추출
		List<MissionDetail> typicalMissions = createRandomMission(); //랜덤 특별미션 3개
		List<MissionDetail> dailyMissions = missionDetailRepository.findByType("daily"); //데일리 미션

		List<MissionDetail> allMissions = new ArrayList<>();
		allMissions.addAll(typicalMissions);
		allMissions.addAll(dailyMissions);

		List<Mission> randMissions = allMissions.stream()
			.map(detail -> new Mission(
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

	//---------------------------------------------------------------------------------------

	//해당하는 멤버의 미션 가져오기
	public List<Mission> getTodayMission(Long memberId) {

		try {
			TodayMission todayMission = todayMissionRepository.findByMemberId(memberId);
			if (todayMission == null) {
				throw new TodayMissionNotFoundException("해당 member의 Mission이 없습니다");
			}

			return todayMission.getMissions();

		} catch (TodayMissionNotFoundException e) {
			return new ArrayList<>();
		}
	}

	//완료한 미션 업데이트 및 포인트 추출
	public void updateCompleteMission(Long memberId,String title){
		TodayMission todayMission=todayMissionRepository.findByMemberId(memberId);
		List<Mission> missionList=todayMission.getMissions();
		int completExp=0; //캐릭터에게 전달할 exp

		for (Mission mission : missionList) {
			if (mission.getTitle().equals(title)) {
				mission.setCompleteFlag(true);
				mission.setCompleteTime(now());
				completExp=mission.getExp();
			}
		}
		
		//todayMission 업데이트
		todayMissionRepository.save(todayMission);
	}



	//멤버별 완료한 특별미션 전체조회
	public List<Mission> getCompleteMission(Long memberId){
		CompleteMission completeMission=completeMissionRepository.findByMemberId(memberId);
		List<Mission> missionList=completeMission.getMissions();
		return missionList;
	}
	
	//미션디테일에서 캐릭터의 레벨 이하의 미션 디테일 가져오기

}




