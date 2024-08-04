package com.clio.ondo.domain.schedule.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.clio.ondo.domain.schedule.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
	// @Query(value = "select :day from schedule where counselor_id = :counselorId", nativeQuery = true)
	// int findDayValueByCounselorId(@Param("day") String day, @Param("counselorId") Long counselorId);
}
