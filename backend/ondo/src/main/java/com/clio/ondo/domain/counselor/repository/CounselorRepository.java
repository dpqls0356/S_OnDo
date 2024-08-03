package com.clio.ondo.domain.counselor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;

@Repository
public interface CounselorRepository extends JpaRepository<Counselor, Long> {

}
