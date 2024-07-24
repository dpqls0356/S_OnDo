package com.clio.ondo.domain.mission.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.clio.ondo.domain.mission.model.MissionDetail;

public interface MissionDetailRepository extends MongoRepository<MissionDetail, Long> {
}
