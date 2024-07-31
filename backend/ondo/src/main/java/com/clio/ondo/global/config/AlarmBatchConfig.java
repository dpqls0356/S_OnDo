package com.clio.ondo.global.config;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import org.bson.types.ObjectId;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
import org.springframework.batch.core.explore.JobExplorer;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JdbcPagingItemReader;
import org.springframework.batch.item.database.Order;
import org.springframework.batch.item.database.support.MySqlPagingQueryProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.boot.autoconfigure.batch.JobLauncherApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.util.StringUtils;

import com.clio.ondo.domain.alarm.missionAlarm.model.FCMResultDto;
import com.clio.ondo.domain.alarm.missionAlarm.service.MissionAlarmService;
import com.clio.ondo.domain.chatbot.service.ChatbotServiceImpl;
import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.mission.model.CompleteMission;
import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.repository.MissionRepository;

import lombok.Builder;
import lombok.Data;

@Configuration
@EnableConfigurationProperties(BatchProperties.class)
class AlarmBatchConfig extends DefaultBatchConfiguration {
	@Autowired
	private DataSource dataSource;
	@Autowired
	private MissionRepository missionRepository;
	@Autowired
	private ChatbotServiceImpl chatbotService;
	@Autowired
	private MissionAlarmService missionAlarmService;

	private int chunk = 10;

	// 미션 알람을 보내는 일련의 작업을 Job이라고 만들어 놓는다.
	// Scheduling에서 이 Job을 호출해서 실행하면 된다.
	@Bean
	public Job missionAlarmJob(JobRepository jobRepository,
								Step getMemberIds) {
		return new JobBuilder("missionAlarmJob", jobRepository)
			.start(getMemberIds)
			.build();
	}

	// Job의 작은 작업 단위인 Step이다. 모든 사람의 memberId를 먼저 가져온다.
	@Bean
	public Step getMemberIds(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
		return new StepBuilder("getMemberIds", jobRepository)
			.<Long, List<String>>chunk(chunk, transactionManager)
			.reader(memberIdReader())
			.processor(mongoMemberInfoProcessor())
			.writer(list -> {})
			.build();
	}

	@Bean
	public JdbcPagingItemReader<Long> memberIdReader() {
		JdbcPagingItemReader<Long> reader = new JdbcPagingItemReader<>();
		reader.setDataSource(dataSource);
		reader.setPageSize(1000);
		reader.setRowMapper(new RowMapper<Long>() {
			@Override
			public Long mapRow(ResultSet rs, int rowNum) throws SQLException {
				return rs.getLong("member_id");
			}
		});

		// Paging 설정
		MySqlPagingQueryProvider queryProvider = new MySqlPagingQueryProvider();
		queryProvider.setSelectClause("SELECT member_id");
		queryProvider.setFromClause("FROM member");
		queryProvider.setSortKeys(Collections.singletonMap("member_id", Order.ASCENDING));

		reader.setQueryProvider(queryProvider);
		return reader;
	}

	@Bean
	public ItemProcessor<Long, List<String>> mongoMemberInfoProcessor() {
		return memberId -> {
			// 멤버 아이디 먼저
			StringBuilder sb = new StringBuilder();
			sb.append(memberId).append("\n");
			
			// 몽고디비에서 멤버별 완료 미션을 가져온다.
			//List<CompleteMission> cm =  missionRepository.findMissionByMemberId(memberId);
			List<CompleteMission> cm = new ArrayList<>();
			List<Mission> dummyMission = new ArrayList<>();
			dummyMission.add(new Mission(
				true,
				LocalDateTime.of(2023, 7, 15, 10, 30),
				"Daily Exercise",
				"Complete 30 minutes of cardio exercise.",
				"Special",
				100,
				1
			));
			cm.add(new CompleteMission(new ObjectId() , (long)8, dummyMission));


			List<Mission> missions = new ArrayList<>();
			if(!cm.isEmpty()){
				missions = cm.get(0).getMissions();
			}

			List<Mission> recommendedMissions = chatbotService.getRecommendFromChatbot(memberId, missions);

			List<String> messages = chatbotService.createRecommendMessage(memberId, recommendedMissions);

			List<FCMResultDto> result = missionAlarmService.sendFcmAlarm(memberId, messages.get(0));

			return messages;
		};
	}

	@Bean
	@ConditionalOnMissingBean
	@ConditionalOnProperty(prefix = "spring.batch.job", name = "enabled", havingValue = "true", matchIfMissing = true)
	public JobLauncherApplicationRunner jobLauncherApplicationRunner(JobLauncher jobLauncher, JobExplorer jobExplorer,
		JobRepository jobRepository, BatchProperties properties) {
		JobLauncherApplicationRunner runner = new JobLauncherApplicationRunner(jobLauncher, jobExplorer, jobRepository);
		String jobNames = properties.getJob().getName();
		if (StringUtils.hasText(jobNames)) {
			runner.setJobName(jobNames);
		}
		return runner;
	}

	@Data
	@Builder
	static class MemberForMission {
		Long memberId;
		List<Mission> missions;
	}
}
