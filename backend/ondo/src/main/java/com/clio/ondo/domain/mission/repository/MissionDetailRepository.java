package com.clio.ondo.domain.mission.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.clio.ondo.domain.mission.model.MissionDetail;

public interface MissionDetailRepository extends MongoRepository<MissionDetail, ObjectId> {
	List<MissionDetail> findByType(String type);
}
