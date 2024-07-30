package com.clio.ondo.domain.alarm.missionAlarm.service;

import com.clio.ondo.domain.alarm.missionAlarm.model.FCMToken;
import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.member.repository.MemberRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MissionAlarmService {
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private MissionRepository missionRepository;
	@Autowired
	private RedisTemplate redisTemplate;

	@Transactional
	public void saveToken(FCMToken fcmToken) {
		redisTemplate.opsForList().rightPush(fcmToken.getMemberId(), fcmToken.getToken());
	}
}
