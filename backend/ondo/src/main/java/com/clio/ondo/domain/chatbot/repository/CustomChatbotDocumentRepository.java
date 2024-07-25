package com.clio.ondo.domain.chatbot.repository;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;

public interface CustomChatbotDocumentRepository {
	void upsertByMemberId(Long memberId, ChatbotChatting chatbotChatting);
}
