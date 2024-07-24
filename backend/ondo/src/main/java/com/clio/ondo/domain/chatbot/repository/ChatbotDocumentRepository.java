package com.clio.ondo.domain.chatbot.repository;

import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.model.ChattingDocument;

public interface ChatbotDocumentRepository extends MongoRepository<ChattingDocument, String> {
	@Modifying
	@Transactional
	@Query(value = "{ '_id': ?0 }", update = "{ '$push': { 'chattings': ?1 } }")
	void addChatting(ObjectId id, ChatbotChatting newChat);
}
