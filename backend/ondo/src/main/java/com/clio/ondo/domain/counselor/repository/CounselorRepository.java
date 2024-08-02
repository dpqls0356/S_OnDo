package com.clio.ondo.domain.counselor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clio.ondo.domain.counselor.model.Counselor;

public interface CounselorRepository extends JpaRepository<Counselor, Long> {

}
