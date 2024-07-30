package com.clio.ondo.domain.alarm.missionAlarm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.member.repository.MemberRepository;

@Service
public class MissionAlarmService {
	@Autowired
	private MemberRepository memberRepository;

}
