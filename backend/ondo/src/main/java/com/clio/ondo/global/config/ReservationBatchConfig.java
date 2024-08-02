// package com.clio.ondo.global.config;
//
// import java.sql.ResultSet;
// import java.sql.SQLException;
// import java.util.ArrayList;
// import java.util.Collections;
// import java.util.List;
//
// import javax.sql.DataSource;
//
// import org.springframework.batch.core.Job;
// import org.springframework.batch.core.Step;
// import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
// import org.springframework.batch.core.explore.JobExplorer;
// import org.springframework.batch.core.job.builder.JobBuilder;
// import org.springframework.batch.core.launch.JobLauncher;
// import org.springframework.batch.core.repository.JobRepository;
// import org.springframework.batch.core.step.builder.StepBuilder;
// import org.springframework.batch.item.ItemProcessor;
// import org.springframework.batch.item.database.JdbcPagingItemReader;
// import org.springframework.batch.item.database.Order;
// import org.springframework.batch.item.database.support.MySqlPagingQueryProvider;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.autoconfigure.batch.BatchProperties;
// import org.springframework.boot.autoconfigure.batch.JobLauncherApplicationRunner;
// import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
// import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
// import org.springframework.boot.context.properties.EnableConfigurationProperties;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.jdbc.core.RowMapper;
// import org.springframework.transaction.PlatformTransactionManager;
// import org.springframework.util.StringUtils;
//
// import com.clio.ondo.domain.alarm.missionAlarm.model.FCMResultDto;
// import com.clio.ondo.domain.mission.model.CompleteMission;
// import com.clio.ondo.domain.mission.model.Mission;
// import com.clio.ondo.domain.mission.model.MissionDetail;
// import com.clio.ondo.domain.schedule.model.Schedule;
// import com.clio.ondo.domain.schedule.model.ScheduleDto;
//
// @Configuration
// @EnableConfigurationProperties(BatchProperties.class)
// public class ReservationBatchConfig extends DefaultBatchConfiguration {
// 	@Autowired
// 	private DataSource dataSource;
//
// 	private int chunk = 10;
// 	// Job
// 	@Bean
// 	public Job reservationCreationJob(JobRepository jobRepository,
// 		Step getCounselorSchedule) {
// 		return new JobBuilder("reservationCreationJob", jobRepository)
// 			.start(getCounselorSchedule)
// 			.build();
// 	}
//
// 	// Job의 작은 작업 단위인 Step이다. 모든 사람의 memberId를 먼저 가져온다.
// 	@Bean
// 	public Step getCounselorSchedule(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
// 		return new StepBuilder("getCounselorSchedule", jobRepository)
// 			.<ScheduleDto, String>chunk(chunk, transactionManager)
// 			.reader(counselorScheduleReader())
// 			.processor(reservationScheduleProcessor())
// 			.writer(list -> {})
// 			.build();
// 	}
//
// 	@Bean
// 	public JdbcPagingItemReader<ScheduleDto> counselorScheduleReader() {
// 		JdbcPagingItemReader<ScheduleDto> reader = new JdbcPagingItemReader<>();
// 		reader.setDataSource(dataSource);
// 		reader.setPageSize(1000);
// 		reader.setRowMapper(new RowMapper<Schedule>() {
// 			@Override
// 			public ScheduleDto mapRow(ResultSet rs, int rowNum) throws SQLException {
// 				ScheduleDto schedule = new ScheduleDto();
// 				schedule.setMonday(rs.getString("monday"));
// 				schedule.setTuesday(rs.getString("tuesday"));
// 				schedule.setWednesday(rs.getString("wednesday"));
// 				schedule.setThursday(rs.getString("thursday"));
// 				schedule.setFriday(rs.getString("friday"));
// 				return schedule;
// 			}
// 		});
//
// 		// Paging 설정
// 		MySqlPagingQueryProvider queryProvider = new MySqlPagingQueryProvider();
// 		// queryProvider.setSelectClause("SELECT member_id");
// 		// queryProvider.setFromClause("FROM member");
// 		// queryProvider.setSortKeys(Collections.singletonMap("member_id", Order.ASCENDING));
//
// 		// Paging 설정
// 		queryProvider.setSelectClause("SELECT s.monday, s.tuesday, s.wednesday, s.thursday, s.friday, s.id");
// 		queryProvider.setFromClause("FROM schedule s JOIN counselor c ON s.counselor_id = c.id");
// 		queryProvider.setSortKeys(Collections.singletonMap("s.id", Order.ASCENDING));
//
// 		reader.setQueryProvider(queryProvider);
// 		return reader;
// 	}
//
// 	@Bean
// 	public ItemProcessor<ScheduleDto, String> reservationScheduleProcessor() {
// 		return schedule -> {
//
//
// 			return "완료";
// 		};
// 	}
// }
