package com.clio.ondo.domain.chatbot.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.model.ChattingDocument;

@Repository
public class CustomChatbotDocumentRepositoryImpl implements CustomChatbotDocumentRepository {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public void upsertByMemberId(Long memberId, ChatbotChatting chatbotChatting) {
		Query query = new Query(Criteria.where("memberId").is(memberId));
		Update update = new Update().push("chattings", chatbotChatting);
		mongoTemplate.upsert(query, update, ChattingDocument.class);
	}
}