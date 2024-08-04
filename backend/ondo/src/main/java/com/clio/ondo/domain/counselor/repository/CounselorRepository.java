package com.clio.ondo.domain.counselor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clio.ondo.domain.counselor.model.Counselor;

public interface CounselorRepository extends JpaRepository<Counselor, Long> {
    Optional<Counselor> findByCounselorId(String counselorId);
}
