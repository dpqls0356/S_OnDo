package com.clio.ondo.domain.chatbot.model;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Document(collection = "chatbot")
@AllArgsConstructor
@Getter
public class ChatbotChatting {
	@Id
	private String id;
	private String content;
	private String sender;
	private LocalDateTime createdAt;
	private Long member_id;
}
