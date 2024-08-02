package com.clio.ondo.domain.counselor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clio.ondo.domain.counselor.model.Counselor;

@Repository
public interface CounselorRepository extends JpaRepository<Counselor, Long> {
	@Query(value = "select c from Counselor c where c.id = ?1")
	public Counselor findByCounselorId(Long counselorId);
}
