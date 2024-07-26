package com.clio.ondo.domain.chatbot.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.clio.ondo.domain.chatbot.model.ChattingDocument;
import com.clio.ondo.domain.chatbot.repository.ChatbotDocumentRepository;

@SpringBootTest
class ChatbotServiceImplTest {
	@Autowired
	private ChatbotDocumentRepository chatbotRepository;

	@Test
	public void testFindByMemberId() {
		Long memberId = (long)123123; // 테스트할 memberId
		List<ChattingDocument> documents = chatbotRepository.findByMemberId(memberId);
		assertFalse(documents.isEmpty(), "문서가 비어있습니다.");
	}
}