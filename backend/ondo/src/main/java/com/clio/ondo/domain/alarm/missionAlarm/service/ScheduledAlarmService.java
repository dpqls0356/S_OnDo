package com.clio.ondo.domain.alarm.missionAlarm.service;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.alarm.missionAlarm.model.FCMToken;

@Service
@EnableScheduling
public class ScheduledAlarmService {

	@Autowired
	@Qualifier("missionAlarmJob")
	Job missionAlarmJob;
	@Autowired
	JobLauncher jobLauncher;
	@Autowired
	private RedisTemplate redisTemplate;

	@Transactional
	public void saveToken(Long memberId, FCMToken fcmToken) throws Exception {
		String key = "memberId:" + Long.toString(memberId);

		List<String> tokens = redisTemplate.opsForList().range(key, 0, -1);
		for(String token : tokens) {
			if(token.equals(fcmToken.getFcmtoken())) {
				return;
			}
		}

		redisTemplate.opsForList().rightPush(key, fcmToken.getFcmtoken());
		// 만료 기간을 설정하는 것 초단위로 구체적으로 해보자
		redisTemplate.expire(key, 6000, TimeUnit.SECONDS);
	}

	@Scheduled(fixedDelay = 60000)
	public void createSpecialMission(){
		try{
			JobParameters jobParameters = new JobParametersBuilder()
				.addLong("time", System.currentTimeMillis())
				.toJobParameters();

			jobLauncher.run(missionAlarmJob, jobParameters);
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
}
