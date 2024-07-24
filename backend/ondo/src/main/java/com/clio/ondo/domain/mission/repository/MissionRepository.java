package com.clio.ondo.domain.mission.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.clio.ondo.domain.mission.model.Mission;

public interface MissionRepository extends MongoRepository<Mission, ObjectId> {
}
