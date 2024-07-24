package com.clio.ondo.domain.chatbot.repository;

import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.model.ChattingDocument;

import java.util.List;

public interface ChatbotDocumentRepository extends MongoRepository<ChattingDocument, String> {
	@Modifying
	@Transactional
	@Query(value = "{ 'memberid': ?0 }")
	@Update(update = "{ '$push': { 'chattings': ?1 } }")
	void addChatting(Long memberId, ChatbotChatting newChat);

	@Query(value = "{ 'memberid': ?0 }")
	List<ChattingDocument> findByMemberId(Long memberId);
}
